"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksOfAPredator = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
class TracksOfAPredator extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.TRACKS_OF_A_PREDATOR, "attack of a hungry predator", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        if (this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.WEAPON).lvl <
            3) {
            const campTile = this._game.tileService.campTile;
            const side = campTile.getSideByResource("food");
            if (side) {
                campTile.depleteResource(side, this._eventName);
            }
            else {
                this._game.characterService.hurtAllPlayerCharacters(1, this._eventName);
            }
        }
    }
}
exports.TracksOfAPredator = TracksOfAPredator;
//# sourceMappingURL=TracksOfAPredator.js.map