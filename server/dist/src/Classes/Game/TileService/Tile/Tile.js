"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const ITile_1 = require("../../../../shared/types/Game/TileService/ITile");
const Construction_1 = require("../../../../shared/types/Game/ConstructionService/Construction");
const TileResourceService_1 = require("./TileResourceService/TileResourceService");
const AssignablePawnsItem_1 = require("../../AssignablePawnsItem/AssignablePawnsItem");
const ACTION_1 = require("../../../../shared/types/Game/ACTION");
const LOG_CODE_1 = require("../../../../shared/types/Game/ChatLog/LOG_CODE");
const Invention_1 = require("../../../../shared/types/Game/InventionService/Invention");
const isSide_1 = require("../../../../shared/utils/typeGuards/isSide");
class Tile extends AssignablePawnsItem_1.AssignablePawnsItem {
    constructor(position, id, camp, tileType, game) {
        super(camp ? ACTION_1.ACTION.GATHER : ACTION_1.ACTION.EXPLORE, ACTION_1.ACTION_ITEM.TILE, game);
        this._distance = null;
        this._canCampBeSettled = false;
        this._modifiers = {
            greaterDanger: null,
            timeConsumingAction: null,
            terrainDepleted: null,
            flipped: null,
        };
        this._markedForAction = null;
        this.builtStructures = {
            roof: 0,
            shelter: 0,
            palisade: 0,
        };
        this._position = position;
        this._id = id;
        this._camp = camp;
        this._tileResourceService = tileType;
        this._show = camp;
    }
    get renderData() {
        var _a;
        return Object.assign(Object.assign({}, super.getAssignablePawnsRenderData()), { id: this.id, show: this.show, position: this.position, tileResourceService: ((_a = this.tileResourceService) === null || _a === void 0 ? void 0 : _a.renderData) || null, requiredPawnsSatisfied: {
                left: this.isSideRequiredPawnsSatisfied("left"),
                right: this.isSideRequiredPawnsSatisfied("right"),
            }, canCampBeSettled: this.canCampBeSettled, camp: this.camp, modifiers: this._modifiers, markedForAction: Boolean(this._markedForAction), requiredPawnAmount: this.requiredPawnAmount, isExplored: this.isExplored, canBeExplored: this.canBeExplored, canBeGathered: this.canBeGathered });
    }
    get distance() {
        return this._distance;
    }
    set distance(value) {
        this._distance = value;
    }
    get hasShortcut() {
        var _a;
        return Boolean(this._tileResourceService &&
            (this._tileResourceService.resources.left.shortcut ||
                ((_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.resources.right.shortcut)));
    }
    isSideRequiredPawnsSatisfied(side) {
        if (this._tileResourceService && this.requiredPawnAmount !== null) {
            return (this._tileResourceService.resources[side].assignedPawns >
                this.requiredPawnAmount);
        }
        else {
            return true;
        }
    }
    isAnySideRequiredPawnsSatisfied() {
        return (this.isSideRequiredPawnsSatisfied("left") ||
            this.isSideRequiredPawnsSatisfied("right"));
    }
    get requiredPawnAmount() {
        const basePawnAmount = this.getComputedRequiredPawnAmount();
        if (basePawnAmount === null) {
            return null;
        }
        const mod = this._modifiers.timeConsumingAction;
        let pawnAmount = mod && mod.setInRound !== this._game.round
            ? basePawnAmount + 1
            : basePawnAmount;
        if (this._distance != null && this._distance >= 0) {
            return pawnAmount + this._distance - 1;
        }
        else {
            return null;
        }
    }
    get modifiers() {
        return this._modifiers;
    }
    get markedForAction() {
        return this._markedForAction;
    }
    get camp() {
        return this._camp;
    }
    set camp(value) {
        this._camp = value;
    }
    get canCampBeSettled() {
        return (this._canCampBeSettled &&
            this._game.phaseService.phase === "night" &&
            !this._modifiers.flipped);
    }
    set canCampBeSettled(value) {
        this._canCampBeSettled = value;
    }
    get position() {
        return this._position;
    }
    get id() {
        return this._id;
    }
    get show() {
        return this._show;
    }
    set show(value) {
        this._show = value;
    }
    get tileResourceService() {
        return this._tileResourceService;
    }
    get isExplored() {
        return Boolean(this._tileResourceService);
    }
    get canBeExplored() {
        return !this.isExplored && !this._modifiers.flipped;
    }
    get canBeGathered() {
        return ["left", "right"].some((side) => { var _a; return Boolean((_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.canResourceBeGathered(side)); });
    }
    setShortcut(side, value) {
        if (!this._tileResourceService) {
            return;
        }
        this._tileResourceService.setShortcut(side, value);
    }
    resetResourceAssignedPawns() {
        if (this._tileResourceService) {
            this._tileResourceService.resources.left.assignedPawns = 0;
            this._tileResourceService.resources.right.assignedPawns = 0;
        }
    }
    triggerAction() {
        var _a;
        (_a = this._markedForAction) === null || _a === void 0 ? void 0 : _a.trigger.call(this);
        this._markedForAction = null;
        this._game.tileService.updateExploredTerrainTypes();
    }
    isMarkedForAction() {
        if (this._tileResourceService) {
            return (Boolean(this.markedForAction) ||
                this._tileResourceService.isMarkedForAction());
        }
        return Boolean(this.markedForAction);
    }
    hasBasicResource(resource) {
        var _a;
        return ((_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.hasBasicResource(resource)) || false;
    }
    getGatherableResourceAmount(side) {
        var _a;
        return (((_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.getModifiedBasicResourceAmount(side)) ||
            null);
    }
    canResourceBeDepleted(side) {
        var _a;
        return ((_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.canBeDepleted(side)) || false;
    }
    getSideByResource(resource) {
        var _a;
        return ((_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.getSideByResource(resource)) || null;
    }
    depleteResource(side, source) {
        var _a;
        (_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.deplete(side, source);
    }
    unDepleteResource(side) {
        if (this.tileResourceService) {
            this.tileResourceService.resources[side].depleted = false;
        }
    }
    markResourceForAction(arg, actionName, source) {
        if (!this.tileResourceService) {
            throw new Error(`tile is not revealed. id: ${this.id}`);
        }
        const side = (0, isSide_1.isSide)(arg) ? arg : this.getSideByResource(arg);
        if (!side) {
            throw new Error(`Can't find side based on resource! ${side}`);
        }
        this.tileResourceService.markResourceForAction(side, actionName, source);
    }
    canResourceActionBePerformed(action, arg, source) {
        let side = (0, isSide_1.isSide)(arg) ? arg : this.getSideByResource(arg);
        return Boolean(side &&
            this._tileResourceService &&
            this._tileResourceService.canActionBePerformed(action, side, source));
    }
    canActionBePerformed(action) {
        var _a;
        switch (action) {
            case ITile_1.TILE_ACTION.SET_TIME_CONSUMING_ACTION:
                return !this._modifiers.timeConsumingAction;
            case ITile_1.TILE_ACTION.UNSET_TIME_CONSUMING_ACTON:
                return Boolean(this._modifiers.timeConsumingAction);
            case ITile_1.TILE_ACTION.DEPLETE_TERRAIN_TYPE:
                return Boolean((_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.terrainType);
            case ITile_1.TILE_ACTION.SET_GREATER_DANGER:
                return !this._modifiers.greaterDanger;
            case ITile_1.TILE_ACTION.UNSET_GREATER_DANGER:
                return Boolean(this._modifiers.greaterDanger);
            case ITile_1.TILE_ACTION.FLIP:
                return Boolean(this._tileResourceService && !this._modifiers.flipped);
            case ITile_1.TILE_ACTION.UN_FLIP:
                return Boolean(this._modifiers.flipped);
        }
    }
    markTileForActon(actionName, source) {
        let trigger;
        switch (actionName) {
            case ITile_1.TILE_ACTION.SET_GREATER_DANGER:
                trigger = this.getTileModifierTrigger("greaterDanger", true, source);
                break;
            case ITile_1.TILE_ACTION.UNSET_GREATER_DANGER:
                trigger = this.getTileModifierTrigger("greaterDanger", false, source);
                break;
            case ITile_1.TILE_ACTION.SET_TIME_CONSUMING_ACTION:
                trigger = this.getTileModifierTrigger("timeConsumingAction", true, source);
                break;
            case ITile_1.TILE_ACTION.UNSET_TIME_CONSUMING_ACTON:
                trigger = this.getTileModifierTrigger("timeConsumingAction", false, source);
                break;
            case ITile_1.TILE_ACTION.DEPLETE_TERRAIN_TYPE:
                trigger = this.getTileModifierTrigger("terrainDepleted", true, source);
                break;
            case ITile_1.TILE_ACTION.FLIP:
                trigger = this.getTileModifierTrigger("flipped", true, source);
                break;
            case ITile_1.TILE_ACTION.UN_FLIP:
                trigger = this.getTileModifierTrigger("flipped", false, source);
        }
        this._markedForAction = {
            action: actionName,
            source,
            trigger,
        };
    }
    resetTileActionMark() {
        this._markedForAction = null;
    }
    resetTileResourceActionMarks() {
        var _a;
        (_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.resetActionMarks();
    }
    triggerResourceAction(side, source) {
        var _a;
        (_a = this.tileResourceService) === null || _a === void 0 ? void 0 : _a.triggerAction(side, source);
    }
    reveal(resources) {
        this._tileResourceService = new TileResourceService_1.TileResourceService(this._game, resources.id, resources.terrainType, resources.resources, resources.extras);
        this._action = ACTION_1.ACTION.GATHER;
    }
    setStructureLvl(structure, amount) {
        this.builtStructures[structure] = amount;
    }
    incrementStructureLvl(structure, amount) {
        this.builtStructures[structure] += amount;
    }
    // TODO: implement edge cases
    decrementStructureLvl(structure, amount) {
        this.builtStructures[structure] -= amount;
    }
    resetStructures() {
        this.builtStructures = {
            roof: 0,
            shelter: 0,
            palisade: 0,
        };
    }
    applyGreaterDangerEffect(resolver) {
        if (this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.WEAPON)
            .lvl < 1) {
            this._game.characterService.hurt(resolver, 1, "Zagrożenie");
        }
    }
    addModifier(arg, source) {
        var _a, _b;
        if ((0, isSide_1.isSide)(arg)) {
            (_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.addResourceBoostBySide(arg, source);
        }
        else {
            (_b = this._tileResourceService) === null || _b === void 0 ? void 0 : _b.addModifierByResource(arg, source);
        }
    }
    removeResourceModifier(side, resource, source) {
        var _a;
        const resSide = side ? side : this.getSideByResource(resource);
        if (!side) {
            const resSide = this.getSideByResource("beast");
        }
        if (!resSide) {
            throw new Error("Can't deduce resource side");
        }
        (_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.removeBoost(resSide, source);
    }
    clearResourceModifiers() {
        var _a;
        (_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.clearModifiers();
    }
    getTileModifierTrigger(modifier, value, source) {
        return () => {
            if (value) {
                if (modifier === "flipped" && this.hasShortcut) {
                    this._game.inventionService.destroy(Invention_1.INVENTION_PERSONAL.SHORTCUT);
                }
                this.setTileModifier(modifier, source);
            }
            else {
                this.unsetTileModifier(modifier, source);
            }
        };
    }
    unsetTileModifier(modifier, source) {
        this._modifiers[modifier] = null;
        if (modifier === "flipped") {
            this._game.tileService.updateDistance();
        }
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.TILE_MODIFIER_REMOVED,
            subject1: modifier,
            subject2: "",
            amount: 1,
        }, "positive", source);
    }
    setTileModifier(modifier, source) {
        this.modifiers[modifier] = { source, setInRound: this._game.round };
        if (modifier === "flipped") {
            this._game.tileService.updateDistance();
        }
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.TILE_MODIFIER_ADDED,
            subject1: modifier,
            subject2: "",
            amount: 1,
        }, "negative", source);
    }
    unsetShortcut() {
        this.setShortcut("left", false);
        this.setShortcut("right", false);
    }
    getShortcutResource() {
        var _a;
        return ((_a = this._tileResourceService) === null || _a === void 0 ? void 0 : _a.getShortcutResource()) || null;
    }
}
exports.Tile = Tile;
//# sourceMappingURL=Tile.js.map