"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Castaways1 = void 0;
const Token_1 = require("../Token/Token");
const Token_2 = require("../../../../../shared/types/Game/TokenService/Token");
class Castaways1 extends Token_1.Token {
    constructor(game, id) {
        super(game, Token_2.DISCOVERY_TOKEN.SCENARIO_1, "zioła", "Leczy 1 ranę w nocy.", id);
    }
    use(character, target) {
        if (!target) {
            throw new Error("No target specified");
        }
        if (this._game.phaseService.phase === "night") {
            super.use(character, target);
            this._game.characterService.heal(target, 1, this._sourceLog);
            this._used = true;
        }
        else {
            this._game.alertService.setAlert(`Tego żetonu można użyć tylko w nocy.`);
        }
    }
    autoDiscard() {
        return;
    }
}
exports.Castaways1 = Castaways1;
//# sourceMappingURL=Castaways1.js.map