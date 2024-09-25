"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beast = void 0;
const AssignablePawnsItem_1 = require("../../AssignablePawnsItem/AssignablePawnsItem");
const ACTION_1 = require("@shared/types/Game/ACTION");
const getActionSlotDroppableId_1 = require("@shared/utils/getActionSlotDroppableId");
class Beast extends AssignablePawnsItem_1.AssignablePawnsItem {
    constructor(name, strength, weaponLoss, reward, game) {
        super(ACTION_1.ACTION.HUNT, ACTION_1.ACTION_ITEM.HUNT, game);
        this._name = name;
        this._strength = strength;
        this._weaponLoss = weaponLoss;
        this._reward = reward;
    }
    get renderData() {
        return Object.assign({ name: this.name }, super.getAssignablePawnsRenderData());
    }
    // ----------------------------------------------
    get requiredPawnAmount() {
        return 2;
    }
    get name() {
        return this._name;
    }
    get strength() {
        return this._strength;
    }
    get weaponLoss() {
        return this._weaponLoss;
    }
    get reward() {
        return this._reward;
    }
    getLeader() {
        const pawn = this._game.actionSlotService.getPawn((0, getActionSlotDroppableId_1.getActionSlotDroppableId)(ACTION_1.ACTION.HUNT, null, null, 0));
        if (!pawn) {
            throw new Error("can't get leader");
        }
        return pawn.owner;
    }
    applySpecialEffect() {
        return;
    }
}
exports.Beast = Beast;
//# sourceMappingURL=Beast.js.map