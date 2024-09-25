"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ability = void 0;
const phaseOrder_1 = require("@shared/constants/phaseOrder");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
class Ability {
    constructor(name, phasesAllowed, actionAllowed, cost, game, character) {
        this._lastRoundUsed = 0;
        this._name = name;
        if (phasesAllowed === "all") {
            this._phasesAllowed = [...phaseOrder_1.phaseOrder];
        }
        else {
            this._phasesAllowed = phasesAllowed;
        }
        this._actionAllowed = actionAllowed;
        this._cost = cost;
        this._game = game;
        this._character = character;
    }
    get renderData() {
        return {
            name: this._name,
            phasesAllowed: this._phasesAllowed,
            actionAllowed: this._actionAllowed,
            usedInThisRound: this.usedInThisRound,
            cost: this._cost,
            canBeUsed: this.canBeUsed(),
        };
    }
    get name() {
        return this._name;
    }
    get cost() {
        return this._cost;
    }
    get phasesAllowed() {
        return this._phasesAllowed;
    }
    get actionAllowed() {
        return this._actionAllowed;
    }
    get usedInThisRound() {
        return this._lastRoundUsed === this._game.round;
    }
    canBeUsed() {
        return ((this._phasesAllowed.includes(this._game.phaseService.phase))
            && (this._actionAllowed ? this._actionAllowed === this._game.actionService.action : true)
            && !this.usedInThisRound);
    }
    use(target) {
        this.updateLastRoundUsed();
        this._character.decrDetermination(this.cost);
        this.addLogMsg(this._character.name);
    }
    updateLastRoundUsed() {
        this._lastRoundUsed = this._game.round;
    }
    addLogMsg(charName) {
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.CHARACTER_USED_ABILITY,
            amount: 1,
            subject1: charName,
            subject2: this._name
        }, "neutral", "ability");
    }
}
exports.Ability = Ability;
//# sourceMappingURL=Ability.js.map