"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldMap = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class OldMap extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.OLD_MAP, false, "", 0);
    }
    triggerDrawEffect(drawer) {
        this._game.characterService.incrDeterminationAllCharacters(1, this._name);
    }
}
exports.OldMap = OldMap;
//# sourceMappingURL=OldMap.js.map