"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AShinyJewel = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class AShinyJewel extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.A_SHINY_JEWEL, false, "");
        this.phaseEffect = () => {
            if (this._game.phaseService.phase === "night") {
                this._game.characterService.hurtAllPlayerCharacters(1, this._name);
                this.removeCardAsReminder();
                this._game.phaseService.removePhaseEffect(this.phaseEffect);
            }
        };
    }
    triggerDrawEffect() {
        this.addCardAsReminder();
        this._game.phaseService.addPhaseEffect(this.phaseEffect);
    }
}
exports.AShinyJewel = AShinyJewel;
//# sourceMappingURL=AShinyJewel.js.map