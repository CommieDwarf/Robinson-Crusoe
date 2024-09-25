"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poison = void 0;
const TrapMysteryCard_1 = require("./TrapMysteryCard/TrapMysteryCard");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Poison extends TrapMysteryCard_1.TrapMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TRAP_MYSTERY_CARD.POISON);
        this.phaseEffect = () => {
            if (this._game.phaseService.phase === "night") {
                if (!this._game.inventionService.isBuilt(Invention_1.INVENTION_STARTER.MEDICINE)) {
                    this._game.characterService.hurtAllPlayerCharacters(1, this._name);
                }
                this._game.phaseService.removePhaseEffect(this.phaseEffect);
                this._game.mysteryService.removeCardAsReminder(this);
            }
        };
    }
    triggerDrawEffect(drawer) {
        this._game.characterService.hurt(drawer, 1, this._name);
        this._game.phaseService.addPhaseEffect(this.phaseEffect);
        this._game.mysteryService.addCardAsReminder(this);
    }
}
exports.Poison = Poison;
//# sourceMappingURL=Poison.js.map