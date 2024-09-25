"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntiqueRapier = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class AntiqueRapier extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.ANTIQUE_RAPIER, false, "", 0);
    }
    triggerDrawEffect(drawer) {
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 2, this._name);
    }
}
exports.AntiqueRapier = AntiqueRapier;
//# sourceMappingURL=AntiqueRapier.js.map