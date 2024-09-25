"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mushrooms = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const Invention_1 = require("../../../../../../shared/types/Game/InventionService/Invention");
class Mushrooms extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.MUSHROOMS, "diarrhea", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this._game.resourceService.addBasicResourceToOwned("food", this._game.playerService.players.length, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        if (!this._game.inventionService.isBuilt(Invention_1.INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurtAllPlayerCharacters(1, this._eventName);
        }
    }
}
exports.Mushrooms = Mushrooms;
//# sourceMappingURL=Mushrooms.js.map