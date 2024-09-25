"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileService = void 0;
const shuffleArray_1 = __importDefault(require("@shared/utils/shuffleArray"));
const ITile_1 = require("@shared/types/Game/TileService/ITile");
const TileGraph_1 = require("./TileGraph/TileGraph");
const tileResourceServices_1 = require("@shared/constants/tileResourceServices");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
const TERMS_1 = require("@shared/types/Terms/TERMS");
const TileMarkerService_1 = require("./TileMarkerService/TileMarkerService");
class TileService {
    constructor(game, campTileID) {
        this._roundBasketUsed = 0;
        this._roundSackUsed = 0;
        this._startCamp = 7;
        this._roundCampMoved = 0;
        this._game = game;
        this._tileTypeStack = (0, shuffleArray_1.default)(tileResourceServices_1.fixedTileResources.map((resources) => (Object.assign({}, resources))), this._game.getRandomNumber);
        this._exploredTerrainTypes = new Set([ITile_1.TERRAIN_TYPE.BEACH]);
        this._tileGraph = new TileGraph_1.TileGraph(this._startCamp, game);
        this.revealAdjacentTiles(campTileID);
        this._tileMarkerService = new TileMarkerService_1.TileMarkerService(game);
    }
    get renderData() {
        return {
            tiles: this._tileGraph.vertices.map((vertex) => vertex.data.renderData),
            campJustMoved: this.campJustMoved,
            campTile: this.campTile.renderData,
            isMarkedActionRemaining: this.isMarkedActionRemaining,
        };
    }
    get isMarkedActionRemaining() {
        return this._tileMarkerService.isActionRemaining;
    }
    get campJustMoved() {
        return this._game.round === this._roundCampMoved;
    }
    get tiles() {
        return this._tileGraph.vertices.map((vertex) => vertex.data);
    }
    get exploredTerrainTypes() {
        return this._exploredTerrainTypes;
    }
    get previousCampTile() {
        var _a;
        const tile = (_a = this._tileGraph.previousCampTileVertex) === null || _a === void 0 ? void 0 : _a.data;
        if (tile) {
            return tile;
        }
        else {
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
    updateDistance() {
        this._tileGraph.updateDistance();
    }
    switchOrderInTileStack(tileType, targetPosition) {
        const index = this._tileTypeStack.indexOf(tileType);
        const newTileTypeStack = this._tileTypeStack.filter((type) => type !== tileType);
        if (targetPosition === "top") {
            newTileTypeStack.push(tileType);
        }
        else if (targetPosition === "bottom") {
            newTileTypeStack.unshift(tileType);
        }
        else {
            const temp = this._tileTypeStack[targetPosition];
            newTileTypeStack[targetPosition] = tileType;
            newTileTypeStack[index] = temp;
        }
        this._tileTypeStack = newTileTypeStack;
    }
    resetResourceAssignedPawns() {
        this.tiles.forEach((tile) => tile.resetResourceAssignedPawns());
    }
    gather(sides, tileID, logSource, production) {
        const tile = this.getTile(tileID);
        sides.forEach((side) => {
            const resource = tile.getGatherableResourceAmount(side);
            if (resource) {
                if (this._game.phaseService.phase === "action") {
                    resource.amount = this.addResourceAmountFromItems(resource.amount);
                }
                if (!production) {
                    this._game.resourceService.addBasicResourceToFuture(resource.resource, resource.amount, logSource);
                }
                else {
                    this._game.resourceService.addBasicResourceToOwned(resource.resource, resource.amount, logSource);
                }
            }
        });
        if (production) {
            this.addResourcesFromShortcut();
        }
    }
    explore(id) {
        var _a, _b, _c;
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
        if ((_a = tile.tileResourceService) === null || _a === void 0 ? void 0 : _a.extras.discoveryToken) {
            this._game.tokenService.addRandomTokensToFuture(tile.tileResourceService.extras.discoveryToken);
        }
        if (((_b = tile.tileResourceService) === null || _b === void 0 ? void 0 : _b.resources.left.resource) === "beast" ||
            ((_c = tile.tileResourceService) === null || _c === void 0 ? void 0 : _c.resources.right.resource) === "beast") {
            this._game.beastService.moveBeastFromStackToDeck();
        }
        this._game.inventionService.onMapExplore();
    }
    updateExploredTerrainTypes() {
        const terrainTypes = new Set();
        this._tileGraph.vertices.forEach((vertex) => {
            var _a;
            const tile = vertex.data;
            if (((_a = tile.tileResourceService) === null || _a === void 0 ? void 0 : _a.terrainType)
                && !tile.modifiers.terrainDepleted
                && !tile.modifiers.flipped) {
                terrainTypes.add(tile.tileResourceService.terrainType);
            }
        });
        this._exploredTerrainTypes = terrainTypes;
    }
    addResourcesFromShortcut() {
        var _a;
        const tile = this.tilesAroundCamp.find((tile) => tile.hasShortcut);
        if (!tile) {
            return;
        }
        const resource = tile.getShortcutResource();
        const side = tile.getSideByResource(resource);
        const amount = (_a = tile.getGatherableResourceAmount(side)) === null || _a === void 0 ? void 0 : _a.amount;
        if (!amount) {
            return;
        }
        this._game.resourceService.addBasicResourceToOwned(resource, amount, Invention_1.INVENTION_PERSONAL.SHORTCUT);
    }
    addResourceAmountFromItems(amount) {
        let newAmount = amount;
        const inventionService = this._game.inventionService;
        if (inventionService.isBuilt(Invention_1.INVENTION_NORMAL.BASKET) && this._roundBasketUsed !== this._game.round) {
            newAmount++;
            this._roundBasketUsed = this._game.round;
        }
        if (inventionService.isBuilt(Invention_1.INVENTION_NORMAL.SACK) && this._roundSackUsed !== this._game.round) {
            this._roundSackUsed = this._game.round;
            newAmount++;
        }
        return newAmount;
    }
    canCampBeMoved() {
        return this._tileGraph.canCampBeMoved() && this.campJustMoved;
    }
    getTile(id) {
        return this._tileGraph.getVertex(id).data;
    }
    moveCamp(tileID) {
        const tile = this.getTile(tileID);
        if (!this.canMoveCamp(tile)) {
            throw new Error(`Cannot transfer camp. tileID: ${tileID}`);
        }
        this.executeCampMove(tile);
    }
    markTilesForAction(tiles, action, requiredActionAmount, source, shouldApplyDmg) {
        this._tileMarkerService.markTilesForAction(tiles, action, requiredActionAmount, source, shouldApplyDmg);
    }
    markTileResourcesForAction(tiles, action, source, resource, requiredActionAmount, shouldApplyDmg) {
        this._tileMarkerService.markTileResourcesForAction(tiles, action, source, resource, requiredActionAmount, shouldApplyDmg);
    }
    triggerMarkedResourceAction(tileId, side) {
        this._tileMarkerService.triggerMarkedResourceAction(tileId, side);
    }
    triggerMarkedAction(tileId) {
        this._tileMarkerService.triggerMarkedAction(tileId);
    }
    moveConstructions() {
        const logSource = TERMS_1.TERMS.CAMP_MOVEMENT;
        const constructionService = this._game.constructionService;
        const affectedConstructions = [Construction_1.CONSTRUCTION.ROOF, Construction_1.CONSTRUCTION.PALISADE];
        if (constructionService.isBuilt(Construction_1.CONSTRUCTION.SHELTER)) {
            affectedConstructions.forEach((constr) => constructionService.setDividedLvlByTwoRoundedUp(constr, logSource));
        }
        else {
            affectedConstructions.forEach((constr) => constructionService.lvlDownIfPossible(constr, Infinity, logSource));
        }
    }
    moveModifiers(currentTileId, targetTileId) {
        var _a;
        const [currentTile, targetTile] = [this.getTile(currentTileId), this.getTile(targetTileId)];
        const resources = ["wood", "food"];
        resources.forEach((res) => {
            var _a, _b;
            const currentSide = currentTile.getSideByResource(res);
            const targetSide = targetTile.getSideByResource(res);
            if (currentSide && targetSide) {
                const currentResources = (_a = currentTile.tileResourceService) === null || _a === void 0 ? void 0 : _a.resources[currentSide];
                const targetResources = (_b = targetTile.tileResourceService) === null || _b === void 0 ? void 0 : _b.resources[targetSide];
                if (currentResources && targetResources) {
                    targetResources.modifiers = targetResources.modifiers.concat(currentResources === null || currentResources === void 0 ? void 0 : currentResources.modifiers);
                }
            }
        });
        (_a = currentTile.tileResourceService) === null || _a === void 0 ? void 0 : _a.clearModifiers();
    }
    pickTileTypesFromStack(amount) {
        return this._tileTypeStack.slice(-amount);
    }
    revealAdjacentTiles(id) {
        const tile = this.getTile(id);
        tile.position.borderTiles.forEach((id) => {
            this.getTile(id).show = true;
        });
    }
    static getSourceSideFromDroppableId(droppableId) {
        switch (true) {
            case droppableId.includes("left"):
                return "left";
            case droppableId.includes("right"):
                return "right";
            default:
                return null;
        }
    }
    executeCampMove(tile) {
        this.moveModifiers(this.campTile.id, tile.id);
        this._tileGraph.moveCamp(tile.id);
        this._roundCampMoved = this._game.round;
        this._game.constructionService.updateLocks();
        this.logCampMoved();
        this.moveConstructions();
        this.handleShortcutDestruction(tile);
    }
    handleShortcutDestruction(tile) {
        if (tile.hasShortcut) {
            this._game.inventionService.destroy(Invention_1.INVENTION_PERSONAL.SHORTCUT);
        }
        const shortcutTile = this.tiles.find((t) => t.hasShortcut);
        if (shortcutTile && !this.tilesAroundCamp.includes(tile)) {
            this._game.inventionService.destroy(Invention_1.INVENTION_PERSONAL.SHORTCUT);
        }
    }
    logCampMoved() {
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.CAMP_MOVED,
            amount: 1,
            subject1: "",
            subject2: ""
        }, "neutral", TERMS_1.TERMS.NIGHT);
    }
    canMoveCamp(tile) {
        return this._game.phaseService.phase === "night" && tile.canCampBeSettled;
    }
}
exports.TileService = TileService;
//# sourceMappingURL=TileService.js.map