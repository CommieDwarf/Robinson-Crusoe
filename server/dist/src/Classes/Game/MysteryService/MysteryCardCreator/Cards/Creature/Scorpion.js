"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scorpion = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const Invention_1 = require("../../../../../../shared/types/Game/InventionService/Invention");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class Scorpion extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SCORPION, false, "");
    }
    triggerDrawEffect(drawer) {
        if (!this._game.inventionService.isBuilt(Invention_1.INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(drawer, 3, this._name);
        }
    }
}
exports.Scorpion = Scorpion;
//# sourceMappingURL=Scorpion.js.map