"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterTheHurricane = void 0;
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
class AfterTheHurricane extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.AFTER_THE_HURRICANE, "another hurricane", false, game, "shuffle", "");
        this._tile = null;
    }
    resolveOption1(resolver) {
        this._game.resourceService.addBasicResourceToFuture("wood", 2, this._name);
        const tile = this.getTile();
        tile.setTileModifier("timeConsumingAction", this._name);
        this._tile = tile;
    }
    triggerEventEffect() {
        if (this._tile) {
            this._tile.setTileModifier("flipped", this._eventName);
        }
    }
}
exports.AfterTheHurricane = AfterTheHurricane;
//# sourceMappingURL=AfterTheHurricane.js.map