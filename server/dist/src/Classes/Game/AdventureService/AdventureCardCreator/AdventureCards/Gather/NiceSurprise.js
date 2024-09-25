"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NiceSurprise = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("../../../../../../shared/types/Game/ConstructionService/Construction");
class NiceSurprise extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.NICE_SURPRISE, "collapsed roof", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this._game.resourceService.addBasicResourceToOwned("wood", 3, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.constructionService.setDividedLvlByTwoRoundedDown(Construction_1.CONSTRUCTION.ROOF, this._eventName);
    }
}
exports.NiceSurprise = NiceSurprise;
//# sourceMappingURL=NiceSurprise.js.map