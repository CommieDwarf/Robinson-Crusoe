"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
class Skeleton extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.SKELETON, "memories of the dead explorer", false, game, "shuffle", "");
    }
    resolveOption1(resolver) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        //TODO: add random invention.
        this._game.moraleService.lvlDown(1, this._eventName);
    }
}
exports.Skeleton = Skeleton;
//# sourceMappingURL=Skeleton.js.map