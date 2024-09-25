"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NastyWound = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
class NastyWound extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.NASTY_WOUND, "infection", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.setResolver(resolver);
        resolver.setWound("arm", this._action, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        if (!this._game.inventionService.isBuilt(Invention_1.INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(this.getResolver(), 2, this._eventName);
        }
        this.getResolver().unsetWound("arm", this._action, this._eventName);
    }
}
exports.NastyWound = NastyWound;
//# sourceMappingURL=NastyWound.js.map