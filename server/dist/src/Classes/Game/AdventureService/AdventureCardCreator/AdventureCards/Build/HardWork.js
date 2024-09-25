"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardWork = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class HardWork extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.HARD_WORK, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        this._game.resourceService.spendBasicResourceIfPossible("food", 1, this._name);
    }
}
exports.HardWork = HardWork;
//# sourceMappingURL=HardWork.js.map