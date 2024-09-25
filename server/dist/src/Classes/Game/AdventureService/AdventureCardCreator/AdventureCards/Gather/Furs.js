"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Furs = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class Furs extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.FURS, "insects", true, game, "discard", "");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this._game.resourceService.addBasicResourceToOwned("leather", 2, this._name);
    }
    triggerEventEffect() {
        //TODO: decrement 1 food in production Phase if possible
    }
}
exports.Furs = Furs;
//# sourceMappingURL=Furs.js.map