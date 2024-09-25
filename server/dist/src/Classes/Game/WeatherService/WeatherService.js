"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const RollDiceService_1 = require("../RollDiceService/RollDiceService");
const Construction_1 = require("@shared/types/Game/ConstructionService/Construction");
const Invention_1 = require("@shared/types/Game/InventionService/Invention");
const MYSTERY_CARD_1 = require("@shared/types/Game/MysteryService/MYSTERY_CARD");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
class WeatherService {
    constructor(game) {
        this._tokens = {
            snow: false,
            rain: false,
            storm: false,
        };
        this._modifiers = {
            rain: 0,
            snow: 0,
        };
        this._furnace = false;
        this._rollDiceResult = null;
        this._game = game;
    }
    get renderData() {
        return {
            tokens: this._tokens,
            rollDiceResult: this._rollDiceResult,
            overallWeather: this.getOverallWeather(),
            shouldRollDices: this.shouldRollDices,
        };
    }
    getOverallWeather() {
        var _a;
        const animals = (_a = this._rollDiceResult) === null || _a === void 0 ? void 0 : _a.animals;
        let { rain, snow } = this.countClouds();
        rain += this._modifiers.rain;
        snow += this._modifiers.snow;
        rain = rain < 0 ? 0 : rain;
        snow = snow < 0 ? 0 : snow;
        if (snow > 0 && this._game.inventionService.isBuilt(Invention_1.INVENTION_NORMAL.FURNACE)) {
            snow--;
        }
        if (snow > 0 && this._game.mysteryService.hasTreasureCard(MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.OLD_CLOTHES)) {
            snow--;
            rain++;
        }
        return {
            snow,
            rain,
            storm: this._tokens.storm,
            animals: animals || null,
        };
    }
    setToken(token, value, logSource) {
        this._tokens[token] = value;
        if (logSource) {
            if (value) {
                this._game.logService.addMessage({
                    code: LOG_CODE_1.LOG_CODE.WEATHER_TOKEN_SET,
                    subject1: token,
                    subject2: "",
                    amount: 1
                }, "negative", logSource);
            }
        }
    }
    get furnace() {
        return this._furnace;
    }
    set furnace(value) {
        this._furnace = value;
    }
    get tokens() {
        return this._tokens;
    }
    get rollDiceResult() {
        return this._rollDiceResult;
    }
    get modifiers() {
        return this._modifiers;
    }
    get shouldRollDices() {
        return (this.shouldRollDice("winter") ||
            this.shouldRollDice("rain") ||
            this.shouldRollDice("animals"));
    }
    incrementModifier(type, value, sourceLog) {
        this._modifiers[type] += value;
        if (value < 0) {
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.WEATHER_CLOUD_DECREMENTED,
                subject1: type,
                subject2: "",
                amount: Math.abs(value),
            }, "positive", sourceLog);
        }
        else if (value > 0) {
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.WEATHER_CLOUD_INCREMENTED,
                subject1: type,
                subject2: "",
                amount: value,
            }, "negative", sourceLog);
        }
    }
    applyEffects() {
        const weather = this.getOverallWeather();
        this.applySnowEffect(weather.snow);
        this.applySnowAndRain(weather.snow, weather.rain);
        if (weather.animals) {
            this.applyAnimalsEffect(weather.animals.result);
        }
        this.resetWeather();
    }
    countClouds() {
        let rain = 0;
        let snow = 0;
        if (this._tokens.rain) {
            rain++;
        }
        if (this._tokens.snow) {
            snow++;
        }
        if (this._rollDiceResult) {
            const rainResult = this._rollDiceResult.rain;
            const snowResult = this._rollDiceResult.winter;
            const results = [rainResult, snowResult];
            results.forEach((result) => {
                if (result) {
                    switch (result.result) {
                        case "rain":
                            rain += 1;
                            break;
                        case "double rain":
                            rain += 2;
                            break;
                        case "snow":
                            snow += 1;
                            break;
                        case "double snow":
                            snow += 2;
                            break;
                    }
                }
            });
        }
        return {
            rain,
            snow,
        };
    }
    resetWeather() {
        this._tokens = {
            storm: false,
            snow: false,
            rain: false,
        };
        this._modifiers = {
            rain: 0,
            snow: 0,
        };
        this._rollDiceResult = null;
    }
    applySnowEffect(snow) {
        this._game.resourceService.spendBasicResourceOrGetHurt("wood", snow, "Drewno na opał");
    }
    applySnowAndRain(snow, rain) {
        const sum = snow + rain;
        const diff = this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.ROOF).lvl -
            sum;
        if (diff < 0) {
            this._game.resourceService.spendBasicResourceOrGetHurt("wood", Math.abs(diff), "Opady");
            this._game.resourceService.spendBasicResourceOrGetHurt("food", Math.abs(diff), "Opady");
        }
    }
    applyAnimalsEffect(diceSide) {
        const logSource = "Wygłodniałe zwierzęta";
        switch (diceSide) {
            case "palisade":
                this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.PALISADE, 1, logSource);
                break;
            case "food":
                this._game.resourceService.spendBasicResourceOrGetHurt("food", 1, logSource);
                break;
            case "beast":
                //TODO: implement fighting beast.
                break;
            case "blank":
                return;
        }
    }
    rollDices() {
        if (this._rollDiceResult) {
            return;
        }
        let winter = null;
        let rain = null;
        let animals = null;
        if (this.shouldRollDice("winter")) {
            winter = RollDiceService_1.RollDiceService.getWeatherRollDiceResult("winter", this._game.getRandomNumber);
        }
        if (this.shouldRollDice("rain")) {
            rain = RollDiceService_1.RollDiceService.getWeatherRollDiceResult("rain", this._game.getRandomNumber);
        }
        if (this.shouldRollDice("animals")) {
            animals = RollDiceService_1.RollDiceService.getWeatherRollDiceResult("animals", this._game.getRandomNumber);
        }
        this._rollDiceResult = {
            winter,
            rain,
            animals,
        };
    }
    shouldRollDice(dice) {
        const weatherDays = this._game.scenarioService.weather;
        return weatherDays[dice].includes(this._game.round);
    }
}
exports.WeatherService = WeatherService;
//# sourceMappingURL=WeatherService.js.map