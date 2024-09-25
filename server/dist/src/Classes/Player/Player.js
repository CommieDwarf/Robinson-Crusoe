"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Character_1 = require("../../shared/types/Game/Characters/Character");
const Soldier_1 = require("../Game/CharacterService/Characters/Soldier");
const Cook_1 = require("../Game/CharacterService/Characters/Cook");
const Explorer_1 = require("../Game/CharacterService/Characters/Explorer");
const Carpenter_1 = require("../Game/CharacterService/Characters/Carpenter");
const isUser_1 = require("../../utils/TypeGuards/isUser");
var PLAYER_STATUS;
(function (PLAYER_STATUS) {
    PLAYER_STATUS["ONLINE"] = "online";
    PLAYER_STATUS["OFFLINE"] = "offline";
})(PLAYER_STATUS || (PLAYER_STATUS = {}));
class Player {
    constructor(user, assignedCharacter, color, id) {
        this._character = null;
        this._ready = false;
        this._prime = false;
        this._status = PLAYER_STATUS;
        this._user = user;
        this._assignedCharacter = assignedCharacter;
        this._color = color;
        this._id = id;
    }
    get renderData() {
        var _a;
        return {
            username: this._user.username,
            color: this._color || "black",
            id: this.id,
            character: ((_a = this._character) === null || _a === void 0 ? void 0 : _a.renderData) || null,
            assignedCharacter: this._assignedCharacter,
            ready: this._ready,
            prime: this._prime,
            isPlaceHolder: this.isPlaceHolder
        };
    }
    get saveData() {
        return {
            userId: this._user.id,
            username: this._user.username,
            color: this._color,
            assignedCharacter: this._assignedCharacter,
        };
    }
    get username() {
        return this._user.username;
    }
    get color() {
        return this._color;
    }
    get assignedCharacter() {
        return this._assignedCharacter;
    }
    get character() {
        return this._character;
    }
    get user() {
        return this._user;
    }
    get id() {
        return this._id;
    }
    get ready() {
        return this._ready;
    }
    set ready(value) {
        this._ready = value;
    }
    get prime() {
        return this._prime;
    }
    set prime(value) {
        this._prime = value;
    }
    get isPlaceHolder() {
        return !(0, isUser_1.isUser)(this._user);
    }
    setUser(user) {
        this._user = user;
    }
    unsetUser() {
        if ((0, isUser_1.isUser)(this._user)) {
            this._user = this._user.getPlaceHolder();
        }
    }
    assignColor(color) {
        this._color = color;
    }
    assignCharacter(character) {
        this._assignedCharacter = character;
    }
    initCharacter(game) {
        var _a;
        switch ((_a = this._assignedCharacter) === null || _a === void 0 ? void 0 : _a.char) {
            case Character_1.CHARACTER.COOK:
                this._character = new Cook_1.Cook(this._assignedCharacter.gender, game, this);
                break;
            case Character_1.CHARACTER.EXPLORER:
                this._character = new Explorer_1.Explorer(this._assignedCharacter.gender, game, this);
                break;
            case Character_1.CHARACTER.CARPENTER:
                this._character = new Carpenter_1.Carpenter(this._assignedCharacter.gender, game, this);
                break;
            case Character_1.CHARACTER.SOLDIER:
                this._character = new Soldier_1.Soldier(this._assignedCharacter.gender, game, this);
        }
    }
    getCharacter() {
        if (!this._character) {
            throw new Error("Character not initialized");
        }
        return this._character;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map