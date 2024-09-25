"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceCommittableItem = void 0;
const AssignablePawnsItem_1 = require("../AssignablePawnsItem/AssignablePawnsItem");
const isPlayerCharacter_1 = require("@shared/utils/typeGuards/isPlayerCharacter");
class ResourceCommittableItem extends AssignablePawnsItem_1.AssignablePawnsItem {
    constructor(action, actionItem, game, resource = null, optionalResource = null) {
        super(action, actionItem, game);
        this._resourceCost = null;
        this._optionalResourceCost = null;
        this._committedResources = null;
        this._personalResourceUsed = false;
        this._pawnOwner = null;
        this._action = action;
        this._resourceCost = resource;
        this._optionalResourceCost = optionalResource;
    }
    get renderData() {
        return Object.assign({}, this.getResourceCommittableRenderData());
    }
    get resourceCost() {
        if (!this._resourceCost) {
            return null;
        }
        return this.getGloballyModifiedResourceAmount(this._resourceCost);
    }
    get secondaryResourceCost() {
        if (!this._optionalResourceCost) {
            return null;
        }
        return this.getGloballyModifiedResourceAmount(this._optionalResourceCost);
    }
    get committedResources() {
        return this._committedResources;
    }
    getResourceCommittableRenderData() {
        return Object.assign(Object.assign({}, this.getAssignablePawnsRenderData()), { committedResources: this._committedResources, resourceCost: this.resourceCost, optionalResourceCost: this.secondaryResourceCost, personalResourceUsed: this._personalResourceUsed });
    }
    commitResource(pawnOwner) {
        var _a, _b;
        if (!this.resourceCost) {
            return;
        }
        let cost;
        const primaryCostModified = this.getCostIncludingPersonalResource(this.resourceCost, pawnOwner);
        const secondaryCostModified = this._optionalResourceCost ? this.getCostIncludingPersonalResource(this._optionalResourceCost, pawnOwner) : undefined;
        let modified = false;
        if (this._game.resourceService.canAffordResource(primaryCostModified.type, primaryCostModified.amount)) {
            cost = primaryCostModified;
            modified = ((_a = this._resourceCost) === null || _a === void 0 ? void 0 : _a.amount) !== cost.amount;
        }
        else if (secondaryCostModified && this._game.resourceService.canAffordResource(secondaryCostModified.type, secondaryCostModified.amount)) {
            cost = secondaryCostModified;
            modified = ((_b = this._optionalResourceCost) === null || _b === void 0 ? void 0 : _b.amount) !== cost.amount;
        }
        if (!cost) {
            throw new Error("Can't afford resource");
        }
        this._pawnOwner = pawnOwner;
        if (modified && (0, isPlayerCharacter_1.isPlayerCharacter)(pawnOwner)) {
            this._personalResourceUsed = true;
            pawnOwner.setPersonalResource(cost.type, false);
        }
        this._game.resourceService.spendBasicResourceIfPossible(cost.type, cost.amount, "");
        this._committedResources = cost;
    }
    unCommitResources() {
        if (!this._committedResources) {
            return;
        }
        if (this._committedResources.type && this._committedResources.amount) {
            this._game.resourceService.addBasicResourceToOwned(this._committedResources.type, this._committedResources.amount, "");
        }
        if (this._personalResourceUsed && this._pawnOwner && (0, isPlayerCharacter_1.isPlayerCharacter)(this._pawnOwner)) {
            this._personalResourceUsed = false;
            this._pawnOwner.setPersonalResource(this._committedResources.type, true);
        }
        this._pawnOwner = null;
        this._committedResources = null;
    }
    consumeCommittedResources() {
        this._committedResources = null;
        this._personalResourceUsed = false;
        this._pawnOwner = null;
    }
    canCommitResource(secondary, pawnOwner) {
        let requirement;
        if (!secondary) {
            requirement = this.resourceCost;
        }
        else {
            requirement = this.secondaryResourceCost;
        }
        if (!requirement) {
            return true;
        }
        const modifiedAmount = this.getCostIncludingPersonalResource(requirement, pawnOwner).amount;
        return this._game.resourceService.owned.basic.canAfford(requirement.type, modifiedAmount);
    }
    getGloballyModifiedResourceAmount(requirement) {
        let amount = requirement.amount;
        if (this._game.actionService.globalCostModifiers[this._action].some((mod) => mod.resource === requirement.type)) {
            amount++;
        }
        return {
            type: requirement.type,
            amount,
        };
    }
    getCostIncludingPersonalResource(requirement, pawnOwner) {
        if (!(0, isPlayerCharacter_1.isPlayerCharacter)(pawnOwner)) {
            return requirement;
        }
        let amount = requirement.amount;
        if (pawnOwner.hasPersonalResource[requirement.type]) {
            amount--;
        }
        return {
            type: requirement.type,
            amount
        };
    }
}
exports.ResourceCommittableItem = ResourceCommittableItem;
//# sourceMappingURL=ResourceCommittableItem.js.map