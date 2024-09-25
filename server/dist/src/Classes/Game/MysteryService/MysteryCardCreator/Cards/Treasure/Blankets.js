"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blankets = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class Blankets extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BLANKETS, false, "", 3);
    }
    use() {
        if (this._game.phaseService.phase === "weather") {
            if (this._game.weatherService.getOverallWeather().snow > 0) {
                this._game.weatherService.incrementModifier("snow", -1, this._name);
                super.use();
                if (this._usedCount === this.uses) {
                    this.removeFromOwnedResources();
                }
            }
        }
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
}
exports.Blankets = Blankets;
//# sourceMappingURL=Blankets.js.map