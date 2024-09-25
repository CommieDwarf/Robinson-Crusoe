"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gorilla = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Gorilla extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.GORILLA, true, "gorilla in the camp");
    }
    triggerDrawEffect(drawer) {
        this._game.characterService.hurt(drawer, 2, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.WEAPON, 2, this._name);
    }
}
exports.Gorilla = Gorilla;
//# sourceMappingURL=Gorilla.js.map