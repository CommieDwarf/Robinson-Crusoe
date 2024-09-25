"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinterIsComing = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class WinterIsComing extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.WINTER_IS_COMING, "frost", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.weatherService.setToken("snow", true, this._eventName);
    }
}
exports.WinterIsComing = WinterIsComing;
//# sourceMappingURL=WinterIsComing.js.map