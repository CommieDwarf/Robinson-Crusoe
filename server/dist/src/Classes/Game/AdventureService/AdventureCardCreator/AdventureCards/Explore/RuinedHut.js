"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuinedHut = void 0;
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class RuinedHut extends ExploreAdventureCard_1.ExploreAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.RUINED_HUT, "restless dreams", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        //TODO: implement free invention build (knife, rope, shovel or medicine)
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.moraleService.lvlDown(1, this._eventName);
    }
}
exports.RuinedHut = RuinedHut;
//# sourceMappingURL=RuinedHut.js.map