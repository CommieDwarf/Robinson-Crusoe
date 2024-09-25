"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerCharacter = void 0;
const Character_1 = require("../Character");
const PawnService_1 = require("../../../../PawnService/PawnService");
const CharEffects_1 = require("../../../CharEffects/CharEffects");
const removeFromArray_1 = require("@shared/utils/removeFromArray");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
class PlayerCharacter extends Character_1.Character {
    constructor(name, id, maxHealth, game, gender, moraleThresholds, invention, player) {
        super(name, id, maxHealth, game);
        this._moraleThresholdsRemoved = [];
        this._weaponBoost = 0;
        this._hasPersonalResource = {
            wood: false,
            leather: false,
            food: false,
            dryFood: false
        };
        this._wounds = {
            head: [],
            arm: [],
            stomach: [],
            leg: [],
        };
        this._player = player;
        this._moraleThresholds = moraleThresholds;
        this._gender = gender;
        this._effects = new CharEffects_1.PlayerCharEffects(this);
        this._pawnService = new PawnService_1.PawnService(this._game, this);
        this._invention = invention;
        this.pawnService.initPawns(2, false, null);
    }
    get renderData() {
        return Object.assign(Object.assign({}, this.getPawnOwnerRenderData()), { pawnService: this._pawnService.renderData });
    }
    getPawnOwnerRenderData() {
        return Object.assign(Object.assign({}, super.getPawnOwnerRenderData()), { moraleThresholds: this._moraleThresholds, playerId: this._player.id, name: this.name, abilities: this._skills.map((skill) => skill.renderData), moraleThresholdsRemoved: this._moraleThresholdsRemoved, wounds: this._wounds, weaponBoost: this._weaponBoost, hasPersonalResource: this._hasPersonalResource, invention: this._invention });
    }
    // ---------------------------------------------
    get invention() {
        return this._invention;
    }
    get hasPersonalResource() {
        return this._hasPersonalResource;
    }
    get wounds() {
        return this._wounds;
    }
    get moraleThresholdsRemoved() {
        return this._moraleThresholdsRemoved;
    }
    get abilities() {
        return this._skills;
    }
    get effects() {
        return this._effects;
    }
    set effects(value) {
        this._effects = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get pawnService() {
        return this._pawnService;
    }
    get player() {
        return this._player;
    }
    get moraleThresholds() {
        return this._moraleThresholds;
    }
    get gender() {
        return this._gender;
    }
    get shouldMoraleDrop() {
        return this._moraleThresholds.includes(this.health);
    }
    get weaponBoost() {
        return this._weaponBoost;
    }
    set weaponBoost(value) {
        this._weaponBoost = value;
    }
    // ---------------------------------------------
    setPersonalResource(resource, value) {
        this._hasPersonalResource[resource] = value;
    }
    setWound(part, action, source) {
        this._wounds[part].push(action);
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.CHARACTER_GOT_WOUND,
            amount: 1,
            subject1: this._name,
            subject2: part
        }, "negative", source);
    }
    unsetWound(part, action, source) {
        if (!this._wounds[part]) {
            return;
        }
        this._wounds[part] = (0, removeFromArray_1.removeFromArray)(this._wounds[part], action);
    }
}
exports.PlayerCharacter = PlayerCharacter;
//# sourceMappingURL=PlayerCharacter.js.map