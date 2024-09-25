"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuriousTiger = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const BasicResources_1 = require("../../../../ResourceService/BasicResources");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class FuriousTiger extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.FURIOUS_TIGER, false, "", "", "fight");
    }
    triggerDrawEffect(drawer) {
        const beastStats = {
            name: this._name,
            strength: 4,
            weaponLoss: 0,
            reward: new BasicResources_1.BasicResources()
        };
        this._game.beastService.fightCustomBeast(drawer, beastStats);
    }
}
exports.FuriousTiger = FuriousTiger;
//# sourceMappingURL=FuriousTiger.js.map