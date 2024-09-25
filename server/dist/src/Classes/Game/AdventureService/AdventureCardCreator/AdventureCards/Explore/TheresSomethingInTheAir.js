"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheresSomethingInTheAir = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class TheresSomethingInTheAir extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR, "cursed island", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this._game.actionService.setAdventureToken(ACTION_1.ACTION.EXPLORE, true, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.actionService.setAdventureToken(ACTION_1.ACTION.EXPLORE, true, this._name);
    }
}
exports.TheresSomethingInTheAir = TheresSomethingInTheAir;
//# sourceMappingURL=TheresSomethingInTheAir.js.map