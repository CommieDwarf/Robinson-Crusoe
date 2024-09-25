"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoraleService = void 0;
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
const TERMS_1 = require("@shared/types/Terms/TERMS");
class MoraleService {
    constructor(game) {
        this._lvl = 0;
        this._maxLvl = 3;
        this._minLvl = -3;
        this._diary = false;
        this._drums = false;
        this._game = game;
    }
    get renderData() {
        return {
            lvl: this._lvl,
        };
    }
    get lvl() {
        return this._lvl;
    }
    get diary() {
        return this._diary;
    }
    set diary(value) {
        this._diary = value;
    }
    get drums() {
        return this._drums;
    }
    set drums(value) {
        this._drums = value;
    }
    lvlUp(amount, logSource) {
        if (this._lvl < 3) {
            this._lvl += amount;
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.MORALE_INCREASED_TO_LVL,
                amount: this._lvl,
                subject1: "",
                subject2: ""
            }, "positive", logSource);
        }
    }
    lvlDown(amount, logSource) {
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.MORALE_DECREASED_TO_LVL,
            amount,
            subject1: "",
            subject2: ""
        }, "negative", logSource);
        const newLvl = this._lvl - amount;
        if (newLvl > this._minLvl) {
            this._lvl = newLvl;
        }
        else {
            this._lvl = this._minLvl;
            const deficit = Math.abs(newLvl) + this._minLvl;
            this._game.characterService.hurtAllPlayerCharacters(deficit, TERMS_1.TERMS.UNFULFILLED_DEMAND);
        }
    }
    triggerPhaseEffect() {
        const primeCharacter = this._game.playerService.primePlayer.getCharacter();
        let amount = this._lvl;
        if (this._game.inventionService.isBuilt(Invention_1.INVENTION_NORMAL.DIARY)) {
            amount++;
        }
        if (this._game.inventionService.isBuilt(Invention_1.INVENTION_NORMAL.DRUMS)) {
            amount += 2;
        }
        if (amount === 0) {
            return;
        }
        if (amount > 0) {
            this._game.characterService.incrDetermination(primeCharacter, amount, "Morale");
        }
        else {
            this._game.characterService.decrDeterminationOrGetHurt(primeCharacter, Math.abs(amount), "Morale");
        }
    }
}
exports.MoraleService = MoraleService;
//# sourceMappingURL=MoraleService.js.map