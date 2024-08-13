import shuffle from "@shared/utils/shuffleArray";
import {ITileService, ITilesServiceRenderData,} from "@shared/types/Game/TileService/ITileService";
import {ITile, TERRAIN_TYPE, TILE_ACTION} from "@shared/types/Game/TileService/ITile";
import {IGame} from "@shared/types/Game/Game";
import {TileGraph} from "./TileGraph/TileGraph";
import {ITileGraph} from "@shared/types/Game/TileService/ITileGraph";
import {Side, TILE_RESOURCE_ACTION} from "@shared/types/Game/TileService/TileResourceService";
import {TileType} from "@shared/types/Game/TileService/TileResourceInfo";
import {fixedTileResources} from "@shared/constants/tileResourceServices";
import {INVENTION_NORMAL} from "@shared/types/Game/InventionService/Invention";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {TERMS} from "@shared/types/Terms/TERMS";
import {TileMarkerService} from "./TileMarkerService/TileMarkerService";

export class TileService implements ITileService {


    private _tileGraph: ITileGraph;
    private _tileTypeStack: TileType[];
    private _exploredTerrainTypes: Set<TERRAIN_TYPE>;
    private _game: IGame;
    private _campJustMoved = false;
    private _roundBasketUsed: number = 0;
    private _roundSackUsed: number = 0;
    private readonly _startCamp = 7;
    private readonly _tileMarkerService: TileMarkerService;


    constructor(game: IGame, campTileID: number) {
        this._game = game;
        this._tileTypeStack = shuffle(fixedTileResources);
        this._exploredTerrainTypes = new Set<TERRAIN_TYPE>([TERRAIN_TYPE.BEACH]);
        this._tileGraph = new TileGraph(this._startCamp, game);
        this.revealAdjacentTiles(campTileID);
        this._tileMarkerService = new TileMarkerService(game);
    }

    get renderData(): ITilesServiceRenderData {
        return {
            tiles: this._tileGraph.vertices.map((vertex) => vertex.data.renderData),
            campJustMoved: this.campJustMoved,
            campTile: this.campTile.renderData,
            isMarkedActionRemaining: this.isMarkedActionRemaining,
        };
    }


    get isMarkedActionRemaining(): boolean {
        return this._tileMarkerService.isActionRemaining;
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

    get exploredTerrainTypes(): Set<TERRAIN_TYPE> {
        return this._exploredTerrainTypes;
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

    public switchOrderInTileStack(tileType: TileType, targetPosition: "top" | "bottom" | number): void {
        const index = this._tileTypeStack.indexOf(tileType);
        const newTileTypeStack = this._tileTypeStack.filter((type) => type !== tileType);
        if (targetPosition === "top") {
            newTileTypeStack.push(tileType)
        } else if (targetPosition === "bottom") {
            newTileTypeStack.unshift(tileType);
        } else {
            const temp = this._tileTypeStack[targetPosition];
            newTileTypeStack[targetPosition] = tileType;
            newTileTypeStack[index] = temp;
        }

        this._tileTypeStack = newTileTypeStack;
    }


    resetResourceAssignedPawns() {
        this.tiles.forEach((tile) => tile.resetResourceAssignedPawns());
    }


    gather(side: "left" | "right", tileID: number, logSource: string, production?: boolean) {
        const tile = this.getTile(tileID);
        const resource = tile.getGatherableResourceAmount(side);

        if (resource) {
            if (this._game.phaseService.phase === "action") {
                resource.amount = this.addResourceAmountFromItems(resource.amount);
            }
            if (!production) {
                this._game.resourceService.addBasicResourceToFuture(
                    resource.resource,
                    resource.amount,
                    logSource
                );
            } else {
                this._game.resourceService.addBasicResourceToOwned(
                    resource.resource,
                    resource.amount,
                    logSource
                );
            }

        }
    }

    explore(id: number) {
        const tileFixedResources = this._tileTypeStack.pop();
        if (!tileFixedResources) {
            throw new Error("Empty tileFixedResources stack!");
        }
        const tile = this.getTile(id);
        tile.reveal(tileFixedResources);
        this.updateExploredTerrainTypes();
        if (tile.position.borderTiles.includes(this.campTile.id)) {
            tile.canCampBeSettled = true;
        }
        this.exploredTerrainTypes.add(tileFixedResources.terrainType);
        this.revealAdjacentTiles(id);
        this._tileGraph.addEdges(id);
        this._tileGraph.updateDistance();
        if (tile.tileResourceService?.extras.discoveryToken) {
            this._game.tokenService.addRandomTokensToFuture(tile.tileResourceService.extras.discoveryToken);
        }
        if (tile.tileResourceService?.resources.left.resource === "beast" ||
            tile.tileResourceService?.resources.right.resource === "beast"
        ) {
            this._game.beastService.moveBeastFromStackToDeck();
        }
        this._game.inventionService.onMapExplore();
    }

    public updateExploredTerrainTypes() {
        const terrainTypes = new Set<TERRAIN_TYPE>();
        this._tileGraph.vertices.forEach((vertex) => {
            const tile = vertex.data;
            if (tile.tileResourceService?.terrainType
                && !tile.modifiers.terrainDepleted
                && !tile.modifiers.flipped
            ) {
                terrainTypes.add(tile.tileResourceService.terrainType)
            }
        })

        this._exploredTerrainTypes = terrainTypes;
    }

    private addResourceAmountFromItems(amount: number) {
        let newAmount = amount;
        const inventionService = this._game.inventionService;
        if (inventionService.isBuilt(INVENTION_NORMAL.BASKET) && this._roundBasketUsed !== this._game.round) {
            newAmount++;
            this._roundBasketUsed = this._game.round;
        }
        if (inventionService.isBuilt(INVENTION_NORMAL.SACK) && this._roundSackUsed !== this._game.round) {
            this._roundSackUsed = this._game.round;
            newAmount++;
        }
        return newAmount;
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
            this.moveModifiers(this.campTile.id, tileID);
            this._tileGraph.moveCamp(tileID);
            this.campJustMoved = true;
            this._game.constructionService.updateLocks();
            this._game.logService.addMessage({
                code: LOG_CODE.CAMP_MOVED,
                amount: 1,
                subject1: "",
                subject2: ""
            }, "neutral", TERMS.NIGHT)
            this.moveConstructions();
        } else {
            throw Error(`Cant transfer camp. tileID: ${tileID}`);
        }
    }

    public markTilesForAction(tiles: ITile[],
                              action: TILE_ACTION,
                              requiredActionAmount: number,
                              source: string,
                              shouldApplyDmg: boolean
    ): void {
        this._tileMarkerService.markTilesForAction(tiles, action, requiredActionAmount, source, shouldApplyDmg);
    }

    public markTileResourcesForAction(tiles: ITile[],
                                      action: TILE_RESOURCE_ACTION,
                                      source: string,
                                      resource: "food" | "wood" | null,
                                      requiredActionAmount: number,
                                      shouldApplyDmg: boolean
    ): void {
        this._tileMarkerService.markTileResourcesForAction(tiles, action, source, resource, requiredActionAmount, shouldApplyDmg)
    }

    public triggerMarkedResourceAction(tileId: number, side: Side): void {
        this._tileMarkerService.triggerMarkedResourceAction(tileId, side);
    }

    public triggerMarkedAction(tileId: number): void {
        this._tileMarkerService.triggerMarkedAction(tileId);
    }


    private moveConstructions() {
        const logSource = TERMS.CAMP_MOVEMENT;
        const constructionService = this._game.constructionService;
        const affectedConstructions = [CONSTRUCTION.ROOF, CONSTRUCTION.PALISADE];
        if (constructionService.isBuilt(CONSTRUCTION.SHELTER)) {
            affectedConstructions.forEach((constr) => constructionService.setDividedLvlByTwoRoundedUp(constr, logSource))
        } else {
            affectedConstructions.forEach((constr) => constructionService.lvlDownIfPossible(constr, Infinity, logSource))
        }
    }

    private moveModifiers(currentTileId: number, targetTileId: number) {
        const [currentTile, targetTile] = [this.getTile(currentTileId), this.getTile(targetTileId)];
        const resources: ["wood", "food"] = ["wood", "food"];

        resources.forEach((res) => {
            const currentSide = currentTile.getSideByResource(res);
            const targetSide = targetTile.getSideByResource(res);
            if (currentSide && targetSide) {
                const currentResources = currentTile.tileResourceService?.resources[currentSide];
                const targetResources = targetTile.tileResourceService?.resources[targetSide];
                if (currentResources && targetResources) {
                    targetResources.modifiers = targetResources.modifiers.concat(currentResources?.modifiers);
                }
            }
        })

        currentTile.tileResourceService?.clearModifiers();
    }


    public pickTileTypesFromStack(amount: number) {
        return this._tileTypeStack.slice(-amount);
    }

    private revealAdjacentTiles(id: number) {
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
