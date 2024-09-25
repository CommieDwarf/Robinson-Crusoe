"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const LOG_CODE_1 = require("../../../../../shared/types/Game/ChatLog/LOG_CODE");
const TERMS_1 = require("../../../../../shared/types/Terms/TERMS");
class Token {
    constructor(game, name, namePL, description, id) {
        this._used = false;
        this._game = game;
        this._name = name;
        this._namePL = namePL;
        this._description = description;
        this._sourceLog = this.name;
        this._id = id;
    }
    get renderData() {
        return {
            name: this._name,
            namePL: this._namePL,
            description: this._description,
            id: this._id,
        };
    }
    get namePL() {
        return this._namePL;
    }
    get used() {
        return this._used;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    use(character, target) {
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.CHARACTER_USED_TOKEN,
            amount: 1,
            subject1: character.name,
            subject2: this._name
        }, "neutral", TERMS_1.TERMS.DISCOVERY_TOKEN);
    }
    autoDiscard() {
    }
}
exports.Token = Token;
//# sourceMappingURL=Token.js.map