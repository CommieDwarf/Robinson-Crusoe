"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiratesChest = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class PiratesChest extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.PIRATES_CHEST, "curse", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this.startDrawingMysteryCards(0, 0, 2, resolver);
    }
    triggerEventEffect() {
        //TODO: every player can use only 1 pawn.
    }
}
exports.PiratesChest = PiratesChest;
//# sourceMappingURL=PiratesChest.js.map