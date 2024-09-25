"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathOfAPredator = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class PathOfAPredator extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.PATH_OF_A_PREDATOR, "attack of a beast", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: set beast dice to weather.
    }
}
exports.PathOfAPredator = PathOfAPredator;
//# sourceMappingURL=PathOfAPredator.js.map