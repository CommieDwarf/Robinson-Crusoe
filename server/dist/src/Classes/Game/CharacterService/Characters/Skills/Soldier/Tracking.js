"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracking = void 0;
const Ability_1 = require("../Ability/Ability");
const ABILITY_1 = require("../../../../../../shared/types/Game/Skill/ABILITY");
const ForbiddenPlayerAction_1 = require("../../../../../../Errors/ForbiddenPlayerAction");
const ALERT_CODE_1 = require("../../../../../../shared/types/ALERT_CODE");
class Tracking extends Ability_1.Ability {
    constructor(game, character) {
        super(ABILITY_1.ABILITY.TRACKING, "all", null, 2, game, character);
    }
    use() {
        if (this._game.beastService.deckCount === 0) {
            throw new ForbiddenPlayerAction_1.ForbiddenPlayerAction(ALERT_CODE_1.ALERT_CODE.BEAST_DECK_IS_EMPTY);
        }
        const beast = this._game.beastService.peekBeastFromDeck();
        super.use(null);
        this._game.startPickingObject([beast], this._character, 0, this._name, "beast", () => {
            this._game.beastService.swapDeckTopToBottom();
        }, () => {
        });
    }
}
exports.Tracking = Tracking;
//# sourceMappingURL=Tracking.js.map