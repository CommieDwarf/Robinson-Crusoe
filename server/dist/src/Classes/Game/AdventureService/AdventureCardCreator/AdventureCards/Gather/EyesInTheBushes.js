"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EyesInTheBushes = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class EyesInTheBushes extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.EYES_IN_THE_BUSHES, "unexpected visit", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: set hungry animal in weather.
        // this._game.weatherService.setToken()
    }
}
exports.EyesInTheBushes = EyesInTheBushes;
//# sourceMappingURL=EyesInTheBushes.js.map