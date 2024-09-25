"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindStorm = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("../../../../../../shared/types/Game/ConstructionService/Construction");
class WindStorm extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.WIND_STORM, "natural palisade", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.PALISADE, 1, this._name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        if (this._game.constructionService.isBuilt(Construction_1.CONSTRUCTION.SHELTER)) {
            this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.PALISADE, 1, this._eventName);
        }
    }
}
exports.WindStorm = WindStorm;
//# sourceMappingURL=WindStorm.js.map