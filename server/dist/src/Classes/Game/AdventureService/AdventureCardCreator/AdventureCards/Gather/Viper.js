"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viper = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
class Viper extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.VIPER, "bite", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        if (this._game.inventionService.isBuilt(Invention_1.INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(this.getPrimeCharacter(), 1, this._eventName);
        }
        else {
            this._game.characterService.hurt(this.getPrimeCharacter(), 3, this._eventName);
        }
    }
}
exports.Viper = Viper;
//# sourceMappingURL=Viper.js.map