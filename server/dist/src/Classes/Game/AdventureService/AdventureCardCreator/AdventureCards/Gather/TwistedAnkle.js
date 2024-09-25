"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwistedAnkle = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class TwistedAnkle extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.TWISTED_ANKLE, "swollen ankle", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.setResolver(resolver);
        resolver.setWound("leg", this._action, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: Character with wound can only rest, arrange camp and build.
        //TODO: discard wound
    }
}
exports.TwistedAnkle = TwistedAnkle;
//# sourceMappingURL=TwistedAnkle.js.map