"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Castaways3 = void 0;
const Token_1 = require("../Token/Token");
const Token_2 = require("../../../../../shared/types/Game/TokenService/Token");
const Construction_1 = require("../../../../../shared/types/Game/ConstructionService/Construction");
class Castaways3 extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.SCENARIO_3, "szabla pirata", "Daje +1 do broni ", id);
    }
    use(character, target) {
        super.use(character, target);
        this._game.constructionService.lvlUpConstruction(Construction_1.CONSTRUCTION.WEAPON, 1, this._sourceLog);
        this._used = true;
    }
    autoDiscard() {
        return;
    }
}
exports.Castaways3 = Castaways3;
//# sourceMappingURL=Castaways3.js.map