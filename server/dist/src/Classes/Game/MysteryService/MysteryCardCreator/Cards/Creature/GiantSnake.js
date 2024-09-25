"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiantSnake = void 0;
const CreatureMysteryCard_1 = require("./CreatureMysteryCard/CreatureMysteryCard");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
class GiantSnake extends CreatureMysteryCard_1.CreatureMysteryCard {
    constructor(game) {
        super(game, MYSTERY_CARD_1.CREATURE_MYSTERY_CARD.GIANT_SNAKE, false, "");
    }
    triggerDrawEffect(drawer) {
        //TODO: implement stop drawing cards
        this._game.characterService.decrDeterminationOrGetHurt(drawer, drawer.determination, this._name);
        this._game.mysteryService.disableFurtherCardDraw();
    }
}
exports.GiantSnake = GiantSnake;
//# sourceMappingURL=GiantSnake.js.map