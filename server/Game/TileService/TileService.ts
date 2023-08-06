import shuffle from "../../../utils/shuffleArray";
import {ITileService, ITilesServiceRenderData,} from "../../../interfaces/TileService/ITileService";
import {ITile, TERRAIN_TYPE, TILE_ACTION} from "../../../interfaces/TileService/ITile";
import {IGame} from "../../../interfaces/Game";
import {TileGraph} from "./TileGraph/TileGraph";
import {ITileGraph} from "../../../interfaces/TileService/ITileGraph";
import {Side, TILE_RESOURCE_ACTION} from "../../../interfaces/TileService/TileResourceService";
import {FixedTileResources} from "../../../interfaces/TileService/TileResourceInfo";
import {fixedTileResources} from "../../../constants/tileResourceServices";

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

    private _requiredActionCount = 0;

    private _actionQueue: Function[] = [];

    private readonly _sides: Side[] = ["left", "right"];
    basket: boolean = false;
    sack: boolean = false;
    axe: boolean = false;
    resourceAmountToDeplete: number = 0;
    private readonly _startCamp = 7;


    constructor(game: IGame, campTileID: number) {
        this._game = game;
        this._fixedTileResourcesStack = shuffle(fixedTileResources);
        this._terrainTypesExplored = new Set<TERRAIN_TYPE>([TERRAIN_TYPE.BEACH]);
        this._tileGraph = new TileGraph(this._startCamp, game);
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

    public updateDistance() {
        this._tileGraph.updateDistance();
    }


    triggerMarkedTileAction(tileId: number) {
        const tile = this.getTile(tileId);
        if (tile.markedForAction) {
            tile.triggerAction();
        }
        this.decrRequiredActionCount();
        if (this._requiredActionCount === 0) {
            this.finishMarkedTileActions();
        }
    }

    private decrRequiredActionCount() {
        this._requiredActionCount--;
        if (this._requiredActionCount === 0) {
            this.finishMarkedTileActions();
        }

    }

    public triggerMarkedTileResourceAction(tileId: number, side: Side) {
        const tile = this.getTile(tileId);
        tile.triggerResourceAction(side, "");
        this.decrRequiredActionCount();
    }

    private finishMarkedTileActions() {
        this.tiles.forEach((tile) => {
            tile.resetTileResourceActionMarks()
            tile.resetTileActionMark()
        });
        this._actionQueue.shift();
        if (this._actionQueue[0]) {
            this._actionQueue[0]();
        }
    }


    markTilesForAction(tiles: ITile[], action: TILE_ACTION, requiredCount: number, source: string) {
        tiles.forEach((tile) => {
            const mark = () => {
                this._requiredActionCount = requiredCount;
                tile.markTileForActon(action, source);
            }
            if (tile.canActionBePerformed(action)) {

                if (this._actionQueue.length > 0) {
                    this._actionQueue.push(mark);
                } else {
                    mark();
                }
            }
        })
    }

    markTileResourcesForAction(tiles: ITile[], action: TILE_RESOURCE_ACTION, source: string, concreteResource: "food" | "wood" | null) {
        tiles.forEach((tile) => {
            if (concreteResource && tile.hasBasicResource(concreteResource)) {
                const side = tile.getSideByResource(concreteResource) as Side;
                if (tile.canResourceActionBePerformed(action, side, source)) {
                    tile.markResourceForAction(side, action, source)
                }
            } else if (!concreteResource) {
                this._sides.forEach((side) => {
                    if (tile.canResourceActionBePerformed(action, side, source)) {
                        tile.markResourceForAction(side, action, source);
                    }
                })
            }

        })

    }

    public countHowManyTilesCanBeMarkedForAction(tiles: ITile[], action: TILE_ACTION) {
        let count = 0;
        tiles.forEach((tile) => {
            if (tile.canActionBePerformed(action)) {
                count++;
            }
        })
        return count;
    }

    public markResourceTilesForActionOrGetHurt(tiles: ITile[], action: TILE_RESOURCE_ACTION, requiredMarkCount: number, source: string, concreteResource: "food" | "wood" | null = null) {
        const mark = () => {
            const markableActionsCount = this.countHowManyResourcesCanBeMarkedForAction(tiles, action, source, concreteResource);
            const diff = requiredMarkCount - markableActionsCount;
            if (diff > 0) {
                this._game.characterService.hurtAllPlayerCharacters(diff, source);
                this._requiredActionCount = diff;
            } else {
                this._requiredActionCount = requiredMarkCount;
            }
            if (markableActionsCount > 0) {
                this.markTileResourcesForAction(tiles, action, source, concreteResource)
            }
        }
        this._actionQueue.push(mark);
        if (this._actionQueue[0] === mark) {
            mark();
        }
    }

    public countHowManyResourcesCanBeMarkedForAction(tiles: ITile[], action: TILE_RESOURCE_ACTION, source: string, concreteResource: "wood" | "food" | null = null) {
        let count = 0;
        tiles.forEach((tile) => {
            if (concreteResource && tile.hasBasicResource(concreteResource)) {
                const side = tile.getSideByResource(concreteResource) as Side;
                if (tile.canResourceActionBePerformed(action, side, source)) {
                    count++
                }
            } else if (!concreteResource) {
                this._sides.forEach((side) => {
                    if (tile.canResourceActionBePerformed(action, side, source)) {
                        count++;
                    }
                })
            }
        })

        return count;
    }


    resetResourceAssignedPawns() {
        this.tiles.forEach((tile) => tile.resetResourceAssignedPawns());
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
        this._tileGraph.updateDistance();
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
        if (this.tilesAroundCamp.some((tile) => tile.canCampBeSettled)) {

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
