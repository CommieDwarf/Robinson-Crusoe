"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CutHead = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const Invention_1 = require("../../../../../../shared/types/Game/InventionService/Invention");
class CutHead extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.CUT_HEAD, "headache", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        const character = this.getPrimeCharacter();
        this._game.characterService.incrDetermination(character, 2, this.name);
        this._game.characterService.hurt(character, 1, this.name);
        this.setResolver(resolver);
        resolver.setWound("head", this._action, this.name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        if (!this._game.inventionService.isBuilt(Invention_1.INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(this.getResolver(), 2, this._eventName);
        }
        this.getResolver().unsetWound("head", this._action, this._eventName);
    }
}
exports.CutHead = CutHead;
//# sourceMappingURL=CutHead.js.map