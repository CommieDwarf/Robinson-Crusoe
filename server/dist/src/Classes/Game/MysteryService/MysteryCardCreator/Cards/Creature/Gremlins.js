"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gremlins = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const BasicResources_1 = require("../../../../ResourceService/BasicResources");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class Gremlins extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.GREMLINS, true, "gremlins have tracked you down", "fight");
        this._beastStats = {
            name: "gremlins",
            strength: 0,
            weaponLoss: 0,
            reward: new BasicResources_1.BasicResources(),
        };
    }
    triggerDrawEffect(drawer) {
        //TODO: implement custom beast fight;
        this._game.beastService.fightCustomBeast(drawer, this._beastStats);
        this.shuffleIntoEventDeck();
        this._drawResolved = true;
    }
    triggerEventEffect() {
        this._beastStats.strength = 3;
        this._game.beastService.fightCustomBeast(this._game.playerService.primePlayer.getCharacter(), this._beastStats);
        this.shuffleIntoEventDeck();
    }
}
exports.Gremlins = Gremlins;
//# sourceMappingURL=Gremlins.js.map