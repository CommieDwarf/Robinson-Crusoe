"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Savage = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Savage extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.SAVAGE, true, "failed hunt");
    }
    triggerDrawEffect(drawer) {
        const weapon = this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.WEAPON);
        if (weapon.lvl > 0) {
            this._game.constructionService.lvlDownConstruction(Construction_1.CONSTRUCTION.WEAPON, weapon.lvl, this._name);
        }
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.mysteryService.startDrawingCards(0, 0, 1, this._game.playerService.primePlayer.getCharacter());
    }
}
exports.Savage = Savage;
//# sourceMappingURL=Savage.js.map