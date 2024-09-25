"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sabre = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Sabre extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.SABRE, false, "", 1);
        this.usedInRound = 0;
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
    use(player) {
        if (this.usedInRound !== this._game.round && this._game.actionService.action === "hunt") {
            this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
            this._game.characterService.hurt(player.getCharacter(), 1, this._name);
            this.usedInRound = this._game.round;
        }
    }
}
exports.Sabre = Sabre;
//# sourceMappingURL=Sabre.js.map