"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Savings = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class Savings extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.SAVINGS, "bad construction", true, game, "shuffle", "discard");
    }
    resolveOption1(resolver) {
        this._game.resourceService.addBasicResourceToFuture("wood", 2, this._name);
        this.shuffleIntoEventDeck();
    }
    resolveOption2(resolver) {
    }
    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventName);
    }
}
exports.Savings = Savings;
//# sourceMappingURL=Savings.js.map