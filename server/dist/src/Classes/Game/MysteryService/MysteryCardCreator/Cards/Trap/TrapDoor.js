"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrapDoor = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class TrapDoor extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.TRAP_DOOR);
    }
    triggerDrawEffect(drawer) {
        this._game.mysteryService.dropTreasures();
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.LOST_GAINED_TREASURES,
            amount: 0,
            subject1: "",
            subject2: ""
        }, "negative", this._name);
    }
}
exports.TrapDoor = TrapDoor;
//# sourceMappingURL=TrapDoor.js.map