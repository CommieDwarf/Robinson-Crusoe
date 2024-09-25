"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigApe = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const BasicResources_1 = require("../../../../ResourceService/BasicResources");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class BigApe extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.BIG_APE, true, "night demon", "fight");
    }
    triggerDrawEffect(drawer) {
        this.shuffleIntoEventDeck();
    }
    triggerEventEffect() {
        const beastStats = {
            name: "big ape",
            strength: 4,
            weaponLoss: 0,
            reward: new BasicResources_1.BasicResources(0, 0, 0, 2)
        };
        this._game.beastService.fightCustomBeast(this._game.playerService.primePlayer.getCharacter(), beastStats);
    }
}
exports.BigApe = BigApe;
//# sourceMappingURL=BigApe.js.map