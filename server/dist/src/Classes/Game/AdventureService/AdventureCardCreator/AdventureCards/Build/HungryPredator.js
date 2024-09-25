"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HungryPredator = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("../../../../../../shared/types/Game/ConstructionService/Construction");
class HungryPredator extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.HUNGRY_PREDATOR, "revisit", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
        const character = this.getPrimeCharacter();
        this._game.characterService.hurt(character, 2, this._name);
        this._game.resourceService.addBasicResourceToOwned("food", 2, this.name);
        this._game.resourceService.addBasicResourceToOwned("leather", 1, this.name);
    }
    resolveOption2(resolver) {
        this._game.resourceService.spendBasicResourceOrGetHurt("food", 1, this.name);
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.PALISADE, 1, this.name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //todo: implement fighting beast by prime player
    }
}
exports.HungryPredator = HungryPredator;
//# sourceMappingURL=HungryPredator.js.map