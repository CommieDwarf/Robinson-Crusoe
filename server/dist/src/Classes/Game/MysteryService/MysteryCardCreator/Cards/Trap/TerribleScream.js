"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerribleScream = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class TerribleScream extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.TERRIBLE_SCREAM);
    }
    triggerDrawEffect(drawer) {
        this._game.characterService.decrDeterminationOrGetHurt(drawer, drawer.determination, this._name);
    }
}
exports.TerribleScream = TerribleScream;
//# sourceMappingURL=TerribleScream.js.map