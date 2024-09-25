"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nestlings = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class Nestlings extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.NESTLINGS, "angry bird", true, game, "discard", "shuffle");
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        const playerAmount = this._game.playerService.players.length;
        this._game.resourceService.addBasicResourceToOwned("food", playerAmount, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.ROOF, 1, this._eventName);
    }
}
exports.Nestlings = Nestlings;
//# sourceMappingURL=Nestlings.js.map