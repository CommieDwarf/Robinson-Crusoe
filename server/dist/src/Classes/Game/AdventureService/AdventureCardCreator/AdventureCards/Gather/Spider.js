"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spider = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class Spider extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SPIDER, "neck bite", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.setResolver(resolver);
        resolver.setWound("head", this._action, this._name);
    }
    triggerEventEffect() {
        //TODO: guy with wound can use only 1 pawn. discard wound.
    }
}
exports.Spider = Spider;
//# sourceMappingURL=Spider.js.map