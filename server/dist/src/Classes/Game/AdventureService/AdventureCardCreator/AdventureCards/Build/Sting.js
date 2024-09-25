"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sting = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class Sting extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.STING, "shivers", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.setResolver(resolver);
        resolver.setWound("stomach", this._action, this._name);
    }
    triggerEventEffect() {
        //TODO: implement
    }
}
exports.Sting = Sting;
//# sourceMappingURL=Sting.js.map