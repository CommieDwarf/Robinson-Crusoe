"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barrel = void 0;
const TreasureMysteryCard_1 = require("./TreasureMysteryCard/TreasureMysteryCard");
const MYSTERY_CARD_1 = require("../../../../../../shared/types/Game/MysteryService/MYSTERY_CARD");
class Barrel extends TreasureMysteryCard_1.TreasureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.BARREL, false, "", 1);
        this._used = false;
        this._stored = {
            food: 2,
            wood: 0,
            leather: 0,
            dryFood: 0,
        };
    }
    triggerDrawEffect(drawer) {
        this.addToResources();
    }
    use() {
        if (!this._used) {
            this._game.characterService.healAllCharacters(1, this._name);
            this._used = true;
            super.use();
        }
    }
    deposit() {
        if (this._used &&
            this._stored.food < 2 &&
            this._game.resourceService.canAffordResource("food", 1)) {
            this._game.resourceService.spendBasicResourceIfPossible("food", 1, "");
            this._stored.food++;
        }
    }
    withdraw() {
        if (this._stored.food > 0) {
            this._stored.food--;
            this._game.resourceService.addBasicResourceToOwned("food", 1, "");
        }
    }
    getPawnOwnerRenderData() {
        return Object.assign(Object.assign({}, super.getPawnOwnerRenderData()), { stored: this._stored });
    }
}
exports.Barrel = Barrel;
//# sourceMappingURL=Barrel.js.map