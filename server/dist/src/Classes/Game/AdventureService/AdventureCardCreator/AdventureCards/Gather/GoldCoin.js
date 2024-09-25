"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoldCoin = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class GoldCoin extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.GOLD_COIN, "cursed coin", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.actionService.setReRollToken(ACTION_1.ACTION.GATHER, true, this._eventName);
        this._game.actionService.setReRollToken(ACTION_1.ACTION.EXPLORE, true, this._eventName);
        this._game.actionService.setReRollToken(ACTION_1.ACTION.BUILD, true, this._eventName);
    }
}
exports.GoldCoin = GoldCoin;
//# sourceMappingURL=GoldCoin.js.map