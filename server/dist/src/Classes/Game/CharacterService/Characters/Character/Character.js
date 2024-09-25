"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const Game_1 = require("../../../../../shared/types/Game/Game");
const PlayerCharacter_1 = require("./PlayerCharacter/PlayerCharacter");
class Character {
    constructor(name, id, maxHealth, game) {
        this._gender = "male";
        this._determination = 0;
        this._name = name;
        this._id = id;
        this._maxHealth = maxHealth;
        this._health = this._maxHealth;
        this._game = game;
    }
    get renderData() {
        return Object.assign(Object.assign({}, this.getPawnOwnerRenderData()), { pawnService: this._pawnService.renderData });
    }
    getPawnOwnerRenderData() {
        return {
            determination: this._determination,
            gender: this._gender,
            health: this._health,
            id: this._id,
            maxHealth: this._maxHealth,
            name: this._name,
            abilities: this._skills.map((skill) => skill.renderData),
        };
    }
    get abilities() {
        return this._skills;
    }
    get effects() {
        return this._effects;
    }
    get pawnService() {
        return this._pawnService;
    }
    set determination(value) {
        this._determination = value;
    }
    get maxHealth() {
        return this._maxHealth;
    }
    get determination() {
        return this._determination;
    }
    get id() {
        return this._id;
    }
    get health() {
        return this._health;
    }
    set health(value) {
        this._health = value;
    }
    get name() {
        return this._name;
    }
    get gender() {
        return this._gender;
    }
    incrDetermination(by) {
        this._determination += by;
    }
    decrDetermination(by) {
        this._determination -= by;
    }
    hurt(by) {
        this._health -= by;
        if (this instanceof PlayerCharacter_1.PlayerCharacter && this._health <= 0) {
            this._game.setGameStatus(Game_1.GAME_STATUS.LOST);
        }
    }
    heal(by) {
        if (by + this._health > this._maxHealth) {
            this._health = this._maxHealth;
        }
        else {
            this._health += by;
        }
    }
    getAbility(name) {
        const skill = this._skills.find((skill) => skill.name === name);
        if (!skill) {
            throw new Error(`Can't find skill with name: ${name}`);
        }
        return skill;
    }
    useAbility(name, target = null) {
        const skill = this.getAbility(name);
        if (!target) {
            target = this;
        }
        if (skill.usedInThisRound) {
            this._game.alertService.setAlert("Ta umiejętność została już użyta w tej rundzie.");
            return;
        }
        if (this._determination >= skill.cost) {
            skill.use(target);
        }
        else {
            this._game.alertService.setAlert("Za mało determinacji, żeby użyć tej umiejętności");
        }
    }
}
exports.Character = Character;
//# sourceMappingURL=Character.js.map