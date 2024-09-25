"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFlock = void 0;
const GatherAdventureCard_1 = require("./GatherAdventureCard/GatherAdventureCard");
const ADVENTURE_CARD_1 = require("../../../../../../shared/types/Game/AdventureService/ADVENTURE_CARD");
class NewFlock extends GatherAdventureCard_1.GatherAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_GATHER.NEW_FLOCK, "all is gone", false, game, "shuffle", "");
        this._tile = null;
    }
    resolveOption1(resolver) {
        var _a;
        this.shuffleIntoEventDeck();
        const tile = this.getTile();
        const foodSide = tile.getSideByResource("food");
        if (foodSide) {
            (_a = tile.tileResourceService) === null || _a === void 0 ? void 0 : _a.addResourceBoostBySide(foodSide, this._name);
            this._tile = tile;
        }
    }
    triggerEventEffect() {
        var _a;
        if (this._tile) {
            const side = this._tile.getSideByResource("food");
            if (side) {
                if (this._tile.canResourceBeDepleted(side)) {
                    this._tile.depleteResource(side, this._eventName);
                    (_a = this._tile.tileResourceService) === null || _a === void 0 ? void 0 : _a.removeBoost(side, this._eventName);
                }
            }
        }
    }
}
exports.NewFlock = NewFlock;
//# sourceMappingURL=NewFlock.js.map