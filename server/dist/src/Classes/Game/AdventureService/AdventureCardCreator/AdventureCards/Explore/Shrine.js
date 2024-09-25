"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shrine = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const ACTION_1 = require("../../../../../../shared/types/Game/ACTION");
class Shrine extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.SHRINE, "nightmares", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this.startDrawingMysteryCards(0, 0, 1, resolver);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.actionService.setReRollToken(ACTION_1.ACTION.EXPLORE, true, this._eventName);
        this._game.actionService.setReRollToken(ACTION_1.ACTION.GATHER, true, this._eventName);
        this._game.actionService.setReRollToken(ACTION_1.ACTION.BUILD, true, this._eventName);
    }
}
exports.Shrine = Shrine;
//# sourceMappingURL=Shrine.js.map