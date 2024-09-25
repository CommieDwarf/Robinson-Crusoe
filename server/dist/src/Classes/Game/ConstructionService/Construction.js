"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Construction = void 0;
const ACTION_1 = require("@shared/types/Game/ACTION");
const ResourceCommittableItem_1 = require("../ResourceCommittableItem/ResourceCommittableItem");
class Construction extends ResourceCommittableItem_1.ResourceCommittableItem {
    constructor(name, namePL, locked, game, resourceCost, optionalCost) {
        super(ACTION_1.ACTION.BUILD, ACTION_1.ACTION_ITEM.CONSTRUCTION, game, resourceCost, optionalCost);
        this._lvl = 0;
        this._resourceChoice = true;
        this._temporaryBoost = 0;
        this._name = name;
        this._namePL = namePL;
        this._locked = locked;
    }
    get renderData() {
        return Object.assign({ locked: this.locked, lvl: this.lvl, name: this.name, temporaryBoost: this._temporaryBoost, canResourceBeSwitched: this.canResourceBeSwitched() }, super.getResourceCommittableRenderData());
    }
    get boostedLvl() {
        return this._lvl + this._temporaryBoost;
    }
    get resourceChoice() {
        return this._resourceChoice;
    }
    get temporaryBoost() {
        return this._temporaryBoost;
    }
    set lvl(value) {
        this._lvl = value;
    }
    get name() {
        return this._name;
    }
    get namePL() {
        return this._namePL;
    }
    get lvl() {
        return this._lvl;
    }
    get locked() {
        return this._locked;
    }
    set locked(value) {
        this._locked = value;
    }
    incrTemporaryBoost(value) {
        this._temporaryBoost += value;
    }
    resetTemporaryBoost() {
        this._temporaryBoost = 0;
    }
    incrementLvl(num) {
        this._lvl += num;
        this._game.constructionService.updateLocks();
    }
    decrementLvl(num) {
        this._lvl -= num;
        this._game.constructionService.updateLocks();
    }
    switchCommittedResourceType() {
        var _a;
        if (!this._optionalResourceCost || !this._resourceCost) {
            return;
        }
        if (((_a = this.committedResources) === null || _a === void 0 ? void 0 : _a.type) === this._resourceCost.type) {
            this.switchResourceType(this._resourceCost, this._optionalResourceCost);
        }
        else {
            this.switchResourceType(this._optionalResourceCost, this._resourceCost);
        }
    }
    switchResourceType(old, newResource) {
        if (!this._committedResources) {
            return;
        }
        const resourceService = this._game.resourceService;
        if (resourceService.canAffordResource(newResource.type, newResource.amount)) {
            resourceService.addBasicResourceToOwned(old.type, old.amount, "");
            resourceService.spendBasicResourceIfPossible(newResource.type, newResource.amount, "");
            this._committedResources = newResource;
        }
    }
    canResourceBeSwitched() {
        if (!this._committedResources || !this._resourceCost || !this._optionalResourceCost) {
            return false;
        }
        const cost = this._committedResources.type === this._resourceCost.type ? this._optionalResourceCost : this._resourceCost;
        return this._game.resourceService.canAffordResource(cost.type, cost.amount);
    }
}
exports.Construction = Construction;
//# sourceMappingURL=Construction.js.map