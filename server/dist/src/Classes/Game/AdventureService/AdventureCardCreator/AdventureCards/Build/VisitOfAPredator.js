"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitOfAPredator = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class VisitOfAPredator extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.VISIT_OF_A_PREDATOR, "night visit", false, game, "shuffle", "");
        this._eventName = "nocna wizyta";
    }
    resolveOption1(resolver) {
        this._game.resourceService.spendBasicResourceOrGetHurt("food", 1, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: implement throw animals weather dice.
    }
}
exports.VisitOfAPredator = VisitOfAPredator;
//# sourceMappingURL=VisitOfAPredator.js.map