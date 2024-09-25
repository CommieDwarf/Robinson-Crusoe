"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnbelievableEffort = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class UnbelievableEffort extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.UNBELIEVABLE_EFFORT, "sore arms", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this._game.resourceService.addBasicResourceToOwned("wood", 2, this._name);
        this.setResolver(resolver);
        resolver.setWound("arm", this._action, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.characterService.hurt(this.getResolver(), 1, this._eventName);
        this.getResolver().unsetWound("arm", this._action, this._eventName);
    }
}
exports.UnbelievableEffort = UnbelievableEffort;
//# sourceMappingURL=UnbelievableEffort.js.map