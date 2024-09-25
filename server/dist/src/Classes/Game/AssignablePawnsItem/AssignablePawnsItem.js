"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignablePawnsItem = void 0;
const isUniqueAction_1 = require("@shared/utils/typeGuards/isUniqueAction");
class AssignablePawnsItem {
    constructor(type, actionItem, game) {
        this._assignedPawnAmount = 0;
        this._requiredPawnAmount = 1;
        this._game = game;
        this._action = type;
        this._actionItem = actionItem;
    }
    get uniqueAction() {
        return (0, isUniqueAction_1.actionToUniqueAction)(this._action, this._actionItem);
    }
    get action() {
        return this._action;
    }
    get actionItem() {
        return this._actionItem;
    }
    get assignedPawnAmount() {
        return this._assignedPawnAmount;
    }
    get requiredPawnAmount() {
        return this.getComputedRequiredPawnAmount();
    }
    set requiredPawnAmount(value) {
        this._requiredPawnAmount = value;
    }
    getAssignablePawnsRenderData() {
        return {
            assignedPawnAmount: this._assignedPawnAmount,
            requiredPawnAmount: this.getComputedRequiredPawnAmount(),
            action: this._action,
            actionItem: this._actionItem,
            uniqueAction: this.uniqueAction,
        };
    }
    getComputedRequiredPawnAmount() {
        if (!this._requiredPawnAmount) {
            return null;
        }
        if (this._game.actionService.hasGlobalModifier(this._action, "helper")) {
            return this._requiredPawnAmount + 1;
        }
        else {
            return this._requiredPawnAmount;
        }
    }
    incrPawnAmount() {
        this._assignedPawnAmount++;
    }
    decrPawnAmount() {
        this._assignedPawnAmount--;
    }
    resetPawnAmount() {
        this._assignedPawnAmount = 0;
    }
}
exports.AssignablePawnsItem = AssignablePawnsItem;
//# sourceMappingURL=AssignablePawnsItem.js.map