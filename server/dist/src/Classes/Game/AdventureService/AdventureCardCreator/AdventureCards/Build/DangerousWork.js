"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DangerousWork = void 0;
const BuildAdventureCard_1 = require("./BuildAdventureCard/BuildAdventureCard");
const ADVENTURE_CARD_1 = require("@shared/types/Game/AdventureService/ADVENTURE_CARD");
const ACTION_1 = require("@shared/types/Game/ACTION");
class DangerousWork extends BuildAdventureCard_1.BuildAdventureCard {
    constructor(game) {
        super(ADVENTURE_CARD_1.ADVENTURE_CARD_BUILD.DANGEROUS_WORK, "", false, game, "discard", "");
    }
    resolveOption1(resolver) {
        this._game.actionService.setReRollToken(ACTION_1.ACTION.BUILD, true, this.name);
        this._game.actionService.setAdventureToken(ACTION_1.ACTION.BUILD, true, this.name);
    }
}
exports.DangerousWork = DangerousWork;
//# sourceMappingURL=DangerousWork.js.map