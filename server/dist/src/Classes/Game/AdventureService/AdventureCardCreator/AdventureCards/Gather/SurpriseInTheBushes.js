"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurpriseInTheBushes = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class SurpriseInTheBushes extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SURPRISE_IN_THE_BUSHES, "memories", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        //TODO: implement picking starting equipment item.
    }
    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventName);
    }
}
exports.SurpriseInTheBushes = SurpriseInTheBushes;
//# sourceMappingURL=SurpriseInTheBushes.js.map