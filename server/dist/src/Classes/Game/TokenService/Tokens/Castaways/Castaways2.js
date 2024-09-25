"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Castaways2 = void 0;
const Token_1 = require("../Token/Token");
const Token_2 = require("@shared/types/Game/TokenService/Token");
class Castaways2 extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.SCENARIO_2, "oliwa", "2 drewna tylko do odłożenia na stos.", id);
    }
    use(character, target) {
        super.use(character, target);
        this._game.scenarioService.onItemUse(2, this._sourceLog);
        this._used = true;
    }
    autoDiscard() {
        return;
    }
}
exports.Castaways2 = Castaways2;
//# sourceMappingURL=Castaways2.js.map