"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredatorInTheCamp = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class PredatorInTheCamp extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.PREDATOR_IN_THE_CAMP, "what goes around...", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        //TODO: fight beast
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.resourceService.addBasicResourceToOwned("food", 2, this.eventName);
        this._game.resourceService.addBasicResourceToOwned("leather", 1, this.eventName);
    }
}
exports.PredatorInTheCamp = PredatorInTheCamp;
//# sourceMappingURL=PredatorInTheCamp.js.map