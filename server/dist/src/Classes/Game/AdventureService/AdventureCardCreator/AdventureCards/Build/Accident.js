"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accident = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const ACTION_1 = require("../../../../../../shared/types/Game/ACTION");
const Invention_1 = require("../../../../../../shared/types/Game/InventionService/Invention");
//TODO: unimplemented.
class Accident extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.ACCIDENT, "gangrene", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        resolver.setWound("leg", ACTION_1.ACTION.BUILD, this.name);
        this.setResolver(resolver);
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        const resolver = this.getResolver();
        if (this._game.inventionService.isBuilt(Invention_1.INVENTION_STARTER.MEDICINE)) {
            this._game.characterService.hurt(resolver, 1, this._eventName);
        }
        else {
            this._game.characterService.hurt(resolver, 3, this._eventName);
        }
        resolver.unsetWound("leg", ACTION_1.ACTION.BUILD, this._eventName);
    }
}
exports.Accident = Accident;
//# sourceMappingURL=Accident.js.map