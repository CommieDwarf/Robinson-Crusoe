"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fruit = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class Fruit extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.FRUIT, "stomachache", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.setResolver(resolver);
        resolver.setWound("stomach", this._action, this._eventName);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: implement
    }
}
exports.Fruit = Fruit;
//# sourceMappingURL=Fruit.js.map