"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spiders = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class Spiders extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SPIDERS, false, "");
    }
    triggerDrawEffect(drawer) {
        this._game.characterService.decrDeterminationOrGetHurt(drawer, 2, this._name);
    }
}
exports.Spiders = Spiders;
//# sourceMappingURL=Spiders.js.map