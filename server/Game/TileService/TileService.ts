import shuffle from "../../../utils/shuffleArray";
import {ITileService, ITilesServiceRenderData,} from "../../../interfaces/TileService/ITileService";
import {ITile, TERRAIN_TYPE} from "../../../interfaces/TileService/ITile";
import {IGame} from "../../../interfaces/Game";
import {TileGraph} from "./TileGraph/TileGraph";
import {ITileGraph} from "../../../interfaces/TileService/ITileGraph";
import {TILE_RESOURCE_ACTION} from "../../../interfaces/TileService/TileResourceService";
import {FixedTileResources} from "../../../interfaces/TileService/TileResourceInfo";
import {fixedTileResources} from "../../../constants/tileResourceServices";
import {CONSTRUCTION} from "../../../interfaces/ConstructionService/Construction";

export class TileService implements ITileService {
    private _tileGraph: ITileGraph;
    private _fixedTileResourcesStack: FixedTileResources[];
    private readonly _terrainTypesExplored: Set<TERRAIN_TYPE>;
    private _campTransition = {
        status: false,
        forced: false,
    };
    private _game: IGame;
    private _campJustMoved = false;
    basket: boolean = false;
    sack: boolean = false;
    axe: boolean = false;
    resourceAmountToDeplete: number = 0;

    constructor(game: IGame, campTileID: number) {
        this._game = game;
        this._fixedTileResourcesStack = shuffle(fixedTileResources);
        this._terrainTypesExplored = new Set<TERRAIN_TYPE>([TERRAIN_TYPE.BEACH]);
        this._tileGraph = new TileGraph(campTileID, game);
        this.showAdjacentTiles(campTileID);
    }

    get renderData(): ITilesServiceRenderData {
        return {
            tiles: this._tileGraph.vertices.map((vertex) => vertex.data.renderData),
            campJustMoved: this.campJustMoved,
            campTile: this.campTile.renderData,
            resourceAmountToDeplete: this.resourceAmountToDeplete,
            isTileMarkedForAction: this.isTileMarkedForAction,
        };
    }

    get isTileMarkedForAction() {
        return this._tileGraph.vertices.some((vertex) => vertex.data.isMarkedForAction())
    }

    get campJustMoved(): boolean {
        return this._campJustMoved;
    }

    set campJustMoved(value: boolean) {
        this._campJustMoved = value;
    }

    get tiles() {
        return this._tileGraph.vertices.map((vertex) => vertex.data);
    }

    get terrainTypesExplored(): Set<TERRAIN_TYPE> {
        return this._terrainTypesExplored;
    }

    get campTransition(): { forced: boolean; status: boolean } {
        return this._campTransition;
    }

    get previousCampTile(): ITile | null {
        const tile = this._tileGraph.previousCampTileVertex?.data;
        if (tile) {
            return tile;
        } else {
            return null;
        }
    }

    get campTile() {
        return this._tileGraph.campTileVertex.data;
    }

    get tilesAroundCamp() {
        return this._tileGraph
            .getBorderVertices(this.campTile.id)
            .map((vertex) => vertex.data);
    }

    public clearMarkedForDepletion() {
        this.tiles.forEach((tile) => tile.markedForAction = null);
    }

    resetSideAssignedPawns() {
        this.tiles.forEach((tile) => tile.resetSideAssignedPawns);
    }

    markTileForAnyResourceDepletion(tileID: number, sourceLog: string) {
        this.getTile(tileID).markResourceForAction("left", TILE_RESOURCE_ACTION.DEPLETE, sourceLog)
        this.getTile(tileID).markResourceForAction("right", TILE_RESOURCE_ACTION.DEPLETE, sourceLog)
    }

    markTilesAroundCampForResourceDepletion() {
        this.tilesAroundCamp.forEach((tile) => {
            tile.markResourceForAction("left", TILE_RESOURCE_ACTION.DEPLETE, "")
        });
    }

    markClosestResourceForDepletion(resource: "food" | "wood") {
        const closestTiles = this._tileGraph.getClosestTilesWIthResource(resource);
        closestTiles.forEach((tile) => {
            const side = tile.getSideByResource(resource);
            if (!side) {
                throw new Error(`there is no ${resource} on tile: ${tile.id}`);
            }
            tile.markResourceForAction(side, TILE_RESOURCE_ACTION.DEPLETE, "");
        });
    }

    countMarkedResourceForDepletion() {
        let counter = 0;
        this.tiles.forEach((tile) => {
            if (tile.tileResourceService?.resources.left.markedForAction) {
                counter++;
            }
            if (tile.tileResourceService?.resources.right.markedForAction) {
                counter++;
            }
        });
        return counter;
    }

    gather(side: "left" | "right", tileID: number, logSource: string) {
        const tile = this.getTile(tileID);
        const resourceAmount = tile.getGatherableResourceAmount(side);
        if (resourceAmount) {
            this._game.resourceService.addBasicResourceToFuture(
                resourceAmount.resource,
                resourceAmount.amount,
                logSource
            );
        }
    }

    explore(id: number) {
        const tileFixedResources = this._fixedTileResourcesStack.pop();
        if (!tileFixedResources) {
            throw new Error("Empty tileFixedResources stack!");
        }
        const tile = this.getTile(id);
        tile.reveal(tileFixedResources);
        if (tile.position.borderTiles.includes(this.campTile.id)) {
            tile.canCampBeSettled = true;
        }
        this.terrainTypesExplored.add(tileFixedResources.terrainType);
        this.showAdjacentTiles(id);
        this._tileGraph.addEdges(id);
        this._tileGraph.updateRequiredHelpers();
    }

    public canCampBeMoved(): boolean {
        return this._tileGraph.canCampBeMoved();
    }

    public getTile(id: number) {
        return this._tileGraph.getVertex(id).data;
    }

    public moveCamp(tileID: number) {
        if (
            this._game.phaseService.phase === "night" &&
            this.getTile(tileID).canCampBeSettled
        ) {
            this._tileGraph.moveCamp(tileID);
            this.campJustMoved = true;
            this._game.chatLog.addMessage(
                "Obóz został przeniesiony.",
                "green",
                "Noc"
            );
        } else {
            throw Error(`Cant transfer camp. tileID: ${tileID}`);
        }
    }

    public forceCampMovement() {
        this.campTransition.forced = true;
        this.campTransition.status = true;
    }

    public depleteResource(tileID: number, side: "left" | "right") {
        this.getTile(tileID).depleteResource(side, "");
        this.resourceAmountToDeplete--;
        if (this.resourceAmountToDeplete === 0) {
            this.clearMarkedForDepletion();
        }
    }

    private showAdjacentTiles(id: number) {
        const tile = this.getTile(id);
        tile.position.borderTiles.forEach((id) => {
            this.getTile(id).show = true;
        });
    }

    static getSourceSideFromDroppableId(
        droppableId: string
    ): "left" | "right" | null {
        switch (true) {
            case droppableId.includes("left"):
                return "left";
            case droppableId.includes("right"):
                return "right";
            default:
                return null;
        }
    }
}
