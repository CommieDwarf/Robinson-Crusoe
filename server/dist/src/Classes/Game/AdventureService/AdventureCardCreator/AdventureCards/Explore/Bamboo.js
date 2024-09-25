"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bamboo = void 0;
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
const ExploreAdventureCard_1 = require("./ExploreAdventureCard/ExploreAdventureCard");
class Bamboo extends ExploreAdventureCard_1.ExploreAdventureCard {
    // protected _eventOption1 = {
    //     label: "-1 $roof$",
    //     resolve: () => {
    //         this._game.constructionService.lvlDownOrGetHurt(CONSTRUCTION.ROOF, 1, this._eventNamePL);
    //     },
    // }
    // protected _eventOption2 = {
    //     label: "-1 $palisade$",
    //     resolve: () => {
    //         this._game.constructionService.lvlDownOrGetHurt(CONSTRUCTION.PALISADE, 1, this._eventNamePL);
    //     },
    // }
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_EXPLORE.BAMBOO, "bambus", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        this._game.resourceService.addBasicResourceToOwned("wood", 2, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: implement choice between -1 roof and -1 palisade.
    }
}
exports.Bamboo = Bamboo;
//# sourceMappingURL=Bamboo.js.map