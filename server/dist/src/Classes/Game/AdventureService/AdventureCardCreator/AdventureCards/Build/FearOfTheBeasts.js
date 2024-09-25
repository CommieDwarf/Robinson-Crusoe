"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FearOfTheBeasts = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class FearOfTheBeasts extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.FEAR_OF_THE_BEASTS, "expensive protection", false, game, "shuffle", "");
        this._eventNamePL = "kosztowna ochrona";
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //todo: implement const increment for constructions.
    }
}
exports.FearOfTheBeasts = FearOfTheBeasts;
//# sourceMappingURL=FearOfTheBeasts.js.map