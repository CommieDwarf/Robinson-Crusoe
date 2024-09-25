"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarkCloudsInTheSky = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("../../../../../../shared/types/Game/ConstructionService/Construction");
class DarkCloudsInTheSky extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.DARK_CLOUDS_IN_THE_SKY, "heavy rain is over", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this._game.weatherService.setToken("rain", true, this.name);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        if (this._game.constructionService.isBuilt(Construction_1.CONSTRUCTION.SHELTER)) {
            this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.PALISADE, 1, this._eventName);
        }
    }
}
exports.DarkCloudsInTheSky = DarkCloudsInTheSky;
//# sourceMappingURL=DarkCloudsInTheSky.js.map