"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThornyBush = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class ThornyBush extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.THORNY_BUSH, "", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        //TODO: implement wound
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: implement
    }
}
exports.ThornyBush = ThornyBush;
//# sourceMappingURL=ThornyBush.js.map