"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Castaways = void 0;
const ScenarioService_1 = require("../../../shared/types/Game/ScenarioService/ScenarioService");
const castaways_1 = require("../../../shared/constants/scenarios/castaways");
const Game_1 = require("../../../shared/types/Game/Game");
const Invention_1 = require("../../../shared/types/Game/InventionService/Invention");
const LOG_CODE_1 = require("../../../shared/types/Game/ChatLog/LOG_CODE");
const SCENARIO_1 = require("../../../shared/types/Game/ScenarioService/SCENARIO");
class Castaways {
    constructor(game) {
        this._shipRounds = [10, 11, 12];
        this._lastRound = 12;
        this._text = castaways_1.castaways.text;
        this._status = ScenarioService_1.SCENARIO_STATUS.PENDING;
        this._weather = castaways_1.castaways.weather;
        this._woodStashLvl = 1;
        this._maxWoodStashLvl = 5;
        this._committedWood = 0;
        this._scenario = SCENARIO_1.SCENARIO.CASTAWAYS;
        this._lastRoundStashUpgraded = 0;
        this._game = game;
    }
    get renderData() {
        return {
            text: this._text,
            weather: this._weather,
            status: this._status,
            woodStashLvl: this._woodStashLvl,
            canAddWood: this.canAddWood(),
            committedWood: this._committedWood,
            isFireBuilt: this.isFireBuilt,
        };
    }
    get committedWood() {
        return this._committedWood;
    }
    set status(value) {
        this._status = value;
    }
    get scenario() {
        return this._scenario;
    }
    get woodStashLvl() {
        return this._woodStashLvl;
    }
    get text() {
        return this._text;
    }
    get status() {
        return this._status;
    }
    get weather() {
        return this._weather;
    }
    get isFireBuilt() {
        return this._game.inventionService.isBuilt(Invention_1.INVENTION_STARTER.FIRE);
    }
    addWood(character) {
        if (this.canAddWood()) {
            this._committedWood++;
            this._game.resourceService.spendBasicResourceIfPossible("wood", 1, "");
            this.addLogMessage(1, character.name);
            if (this._committedWood === this._woodStashLvl) {
                this.lvlUpStash();
            }
        }
    }
    onItemUse(amount, sourceLog) {
        if (this._lastRoundStashUpgraded !== this._game.round) {
            const sum = this._committedWood + amount;
            if (sum >= this._woodStashLvl) {
                const realAmountAdded = this._woodStashLvl - this._committedWood;
                this.addLogMessage(realAmountAdded, sourceLog);
                this.lvlUpStash();
            }
            else {
                this.addLogMessage(sum, sourceLog);
                this._committedWood += amount;
            }
        }
    }
    canAddWood() {
        return this._lastRoundStashUpgraded !== this._game.round &&
            this._maxWoodStashLvl !== this._woodStashLvl &&
            this._game.resourceService.canAffordResource("wood", 1);
    }
    lvlUpStash() {
        this._woodStashLvl++;
        this._lastRoundStashUpgraded = this._game.round;
        this._committedWood = 0;
        this.checkWinLoseStatus();
    }
    checkWinLoseStatus() {
        if (this._woodStashLvl === this._maxWoodStashLvl &&
            this._shipRounds.includes(this._game.round)) {
            this._game.setGameStatus(Game_1.GAME_STATUS.WON);
        }
        else if (this._game.round > this._lastRound) {
            this._game.setGameStatus(Game_1.GAME_STATUS.LOST);
        }
    }
    addLogMessage(woodAdded, sourceLog) {
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.WOOD_ADDED_TO_PILE,
            amount: woodAdded,
            subject1: "",
            subject2: "",
        }, "positive", sourceLog);
    }
}
exports.Castaways = Castaways;
//# sourceMappingURL=Castaways.js.map