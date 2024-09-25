"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bite = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Bite extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.BITE, false, "");
    }
    triggerDrawEffect(drawer) {
        this._game.characterService.hurt(drawer, 2, this._name);
    }
    triggerEventEffect() {
    }
}
exports.Bite = Bite;
//# sourceMappingURL=Bite.js.map