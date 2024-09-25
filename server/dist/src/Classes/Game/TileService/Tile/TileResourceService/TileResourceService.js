"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileResourceService = void 0;
const TileResourceService_1 = require("@shared/types/Game/TileService/TileResourceService");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
class TileResourceService {
    constructor(game, id, terrainType, resources, extras) {
        this._game = game;
        this._id = id;
        this._terrainType = terrainType;
        this._extras = extras;
        this._resources = {
            left: this.initResources(resources.left),
            right: this.initResources(resources.right),
        };
    }
    get renderData() {
        return {
            id: this._id,
            terrainType: this._terrainType,
            resources: {
                left: Object.assign(Object.assign({}, this._resources.left), { canBeGathered: this.canResourceBeGathered("left") }),
                right: Object.assign(Object.assign({}, this._resources.right), { canBeGathered: this.canResourceBeGathered("right") })
            },
            extras: this._extras,
        };
    }
    get id() {
        return this._id;
    }
    get terrainType() {
        return this._terrainType;
    }
    get resources() {
        return this._resources;
    }
    get extras() {
        return this._extras;
    }
    canResourceBeGathered(side) {
        const resourceInfo = this._resources[side];
        return resourceInfo.resource !== "beast" &&
            !resourceInfo.shortcut &&
            !resourceInfo.depleted;
    }
    hasModifier(side) {
        return this._resources[side].modifiers.length > 0;
    }
    canBeDepleted(side) {
        return (this._resources[side].resource !== "beast" &&
            !this._resources[side].depleted);
    }
    isSideMarkedForAction(side) {
        return Boolean(this.resources[side].markedForAction);
    }
    getModifiedBasicResourceAmount(side) {
        const resource = this._resources[side].resource;
        if (resource !== "beast") {
            const amount = this._resources[side].modifiers.length > 0 ? 2 : 1;
            return {
                resource,
                amount,
            };
        }
        else {
            return null;
        }
    }
    isMarkedForAction() {
        return (Boolean(this._resources.left.markedForAction) ||
            Boolean(this._resources.right.markedForAction));
    }
    hasBasicResource(resource) {
        return (this._resources.left.resource === resource ||
            this._resources.right.resource === resource);
    }
    canActionBePerformed(action, side, source) {
        const { depleted, modifiers, shortcut, resource, } = this._resources[side];
        switch (action) {
            case TileResourceService_1.TILE_RESOURCE_ACTION.ADD_MODIFIER:
                return true;
            case TileResourceService_1.TILE_RESOURCE_ACTION.REMOVE_MODIFIER:
                return modifiers.some((mod) => mod.source === source);
            case TileResourceService_1.TILE_RESOURCE_ACTION.UN_DEPLETE:
                return depleted;
            case TileResourceService_1.TILE_RESOURCE_ACTION.DEPLETE:
                return this.canBeDepleted(side);
            case TileResourceService_1.TILE_RESOURCE_ACTION.SET_SHORTCUT:
                return !depleted && !shortcut && resource !== "beast";
            case TileResourceService_1.TILE_RESOURCE_ACTION.UNSET_SHORTCUT:
                return shortcut;
        }
    }
    markResourceForAction(side, actionName, source) {
        let trigger;
        switch (actionName) {
            case TileResourceService_1.TILE_RESOURCE_ACTION.DEPLETE:
                trigger = this.deplete;
                break;
            case TileResourceService_1.TILE_RESOURCE_ACTION.UN_DEPLETE:
                trigger = this.replenish;
                break;
            case TileResourceService_1.TILE_RESOURCE_ACTION.ADD_MODIFIER:
                trigger = this.addResourceBoostBySide;
                break;
            case TileResourceService_1.TILE_RESOURCE_ACTION.REMOVE_MODIFIER:
                trigger = this.removeBoost;
                break;
            case TileResourceService_1.TILE_RESOURCE_ACTION.SET_SHORTCUT:
                trigger = () => this.setShortcut(side, true);
                break;
            case TileResourceService_1.TILE_RESOURCE_ACTION.UNSET_SHORTCUT:
                trigger = () => this.setShortcut(side, false);
                break;
        }
        this._resources[side].markedForAction = {
            source,
            actionName,
            trigger,
        };
    }
    resetActionMarks() {
        this._resources.left.markedForAction = null;
        this._resources.right.markedForAction = null;
    }
    deplete(side, source) {
        this._resources[side].depleted = true;
        const resource = this._resources[side].resource;
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.RESOURCE_DEPLETED,
            amount: 1,
            subject1: resource,
            subject2: ""
        }, "negative", source);
    }
    replenish(side, source) {
        this._resources[side].depleted = false;
        const resource = this._resources[side].resource;
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.RESOURCE_REPLENISHED,
            amount: 1,
            subject1: resource,
            subject2: ""
        }, "positive", source);
    }
    addResourceBoostBySide(side, source) {
        const resource = this._resources[side].resource;
        if (resource !== "beast") {
            this._resources[side].modifiers.push({ resource, source });
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.RESOURCE_BOOST_ADDED,
                amount: 1,
                subject1: resource,
                subject2: ""
            }, "positive", source);
        }
    }
    addModifierByResource(resource, source) {
        const side = this.getSideByResource(resource);
        if (!side) {
            const beastSide = this.getSideByResource("beast");
            this._resources[beastSide].modifiers.push({ resource, source });
        }
        else {
            this._resources[side].modifiers.push({ resource, source });
        }
    }
    removeBoost(side, source) {
        if (this._resources[side].modifiers.length === 1) {
            const resource = this.resources[side].resource;
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.RESOURCE_BOOST_REMOVED,
                subject1: "resource",
                subject2: "",
                amount: 1
            }, "negative", source);
        }
        this._resources[side].modifiers = this._resources[side].modifiers.filter((mod) => mod.resource === source);
    }
    setShortcut(side, value) {
        if (value && this._resources[side].resource === "beast") {
            throw new Error("Can't place shortcut on a beast!");
        }
        if (value && this._resources[side].depleted) {
            throw new Error("Can't place shortcut on depleted resource");
        }
        this._resources[side].shortcut = value;
    }
    clearModifiers() {
        this._resources.left.modifiers = [];
        this._resources.right.modifiers = [];
    }
    triggerAction(side) {
        var _a, _b;
        if (this._resources[side].markedForAction) {
            (_a = this._resources[side].markedForAction) === null || _a === void 0 ? void 0 : _a.trigger.call(this, side, ((_b = this._resources[side].markedForAction) === null || _b === void 0 ? void 0 : _b.source) || "");
            this._resources[side].markedForAction = null;
        }
    }
    getSideByResource(resource) {
        switch (true) {
            case this._resources.left.resource === resource:
                return "left";
            case this._resources.right.resource === resource:
                return "right";
            default:
                return null;
        }
    }
    getShortcutResource() {
        if (this._resources.left.shortcut) {
            return this._resources.left.resource;
        }
        else if (this._resources.right.shortcut) {
            return this._resources.right.resource;
        }
        else {
            return null;
        }
    }
    initResources(resource) {
        return {
            resource: resource,
            depleted: false,
            modifiers: [],
            markedForAction: null,
            assignedPawns: 0,
            shortcut: false,
        };
    }
}
exports.TileResourceService = TileResourceService;
//# sourceMappingURL=TileResourceService.js.map