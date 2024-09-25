"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bats = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Bats extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.BATS, false, "");
    }
    triggerDrawEffect(drawer) {
        this._game.characterService.decrDeterminationOrGetHurt(drawer, 1, this._name);
    }
}
exports.Bats = Bats;
//# sourceMappingURL=Bats.js.map