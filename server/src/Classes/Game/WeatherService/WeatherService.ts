import {IWeatherService, IWeatherTokens, OverallWeather, WeatherModifiers,} from "@shared/types/Game/Weather/Weather";
import {IGame} from "@shared/types/Game/Game";
import {WeatherDice, WeatherDiceResults, WeatherDiceSide,} from "@shared/types/Game/RollDice/RollDice";
import {RollDiceService} from "../RollDiceService/RollDiceService";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {INVENTION_NORMAL} from "@shared/types/Game/InventionService/Invention";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";

export class WeatherService implements IWeatherService {
    private _tokens: IWeatherTokens = {
        snow: false,
        rain: false,
        storm: false,
    };

    private _modifiers: WeatherModifiers = {
        rain: 0,
        snow: 0,
    };

    private _furnace: boolean = false;

    private readonly _game: IGame;
    private _rollDiceResult: WeatherDiceResults | null = null;

    constructor(game: IGame) {
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

    getOverallWeather(): OverallWeather {
        const animals = this._rollDiceResult?.animals;

        let {rain, snow} = this.countClouds();
        rain += this._modifiers.rain;
        snow += this._modifiers.snow;
        rain = rain < 0 ? 0 : rain;
        snow = snow < 0 ? 0 : snow;

        if (snow > 0 && this._game.inventionService.isBuilt(INVENTION_NORMAL.FURNACE)) {
            snow--;
        }
        if (snow > 0 && this._game.mysteryService.hasTreasureCard(TREASURE_MYSTERY_CARD.OLD_CLOTHES)) {
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

    setToken(token: keyof IWeatherTokens, value: boolean, logSource: string) {
        this._tokens[token] = value;
        if (logSource) {
            if (value) {
                this._game.logService.addMessage({
                    code: LOG_CODE.WEATHER_TOKEN_SET,
                    subject1: token,
                    subject2: "",
                    amount: 1
                }, "negative", logSource)
            }
        }
    }

    get furnace(): boolean {
        return this._furnace;
    }

    set furnace(value: boolean) {
        this._furnace = value;
    }

    get tokens(): IWeatherTokens {
        return this._tokens;
    }

    get rollDiceResult(): WeatherDiceResults | null {
        return this._rollDiceResult;
    }

    get modifiers(): WeatherModifiers {
        return this._modifiers;
    }

    get shouldRollDices() {
        return (
            this.shouldRollDice("winter") ||
            this.shouldRollDice("rain") ||
            this.shouldRollDice("animals")
        );
    }

    incrementModifier(type: keyof WeatherModifiers, value: number, sourceLog: string) {
        this._modifiers[type] += value;
        if (value < 0) {
            this._game.logService.addMessage(
                {
                    code: LOG_CODE.WEATHER_CLOUD_DECREMENTED,
                    subject1: type,
                    subject2: "",
                    amount: Math.abs(value),
                },
                "positive",
                sourceLog);
        } else if (value > 0) {
            this._game.logService.addMessage(
                {
                    code: LOG_CODE.WEATHER_CLOUD_INCREMENTED,
                    subject1: type,
                    subject2: "",
                    amount: value,
                },
                "negative",
                sourceLog);
        }
    }

    public applyEffects() {
        const weather = this.getOverallWeather();
        this.applySnowEffect(weather.snow);
        this.applySnowAndRain(weather.snow, weather.rain);
        if (weather.animals) {
            this.applyAnimalsEffect(weather.animals.result);
        }
        this.resetWeather();
    }

    private countClouds() {
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

    private resetWeather() {
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

    private applySnowEffect(snow: number) {
        this._game.resourceService.spendBasicResourceOrGetHurt(
            "wood",
            snow,
            "Drewno na opał"
        );
    }

    private applySnowAndRain(snow: number, rain: number) {
        const sum = snow + rain;
        const diff =
            this._game.constructionService.getConstruction(CONSTRUCTION.ROOF).lvl -
            sum;
        if (diff < 0) {
            this._game.resourceService.spendBasicResourceOrGetHurt(
                "wood",
                Math.abs(diff),
                "Opady"
            );
            this._game.resourceService.spendBasicResourceOrGetHurt(
                "food",
                Math.abs(diff),
                "Opady"
            );
        }
    }

    private applyAnimalsEffect(diceSide: WeatherDiceSide) {
        const logSource = "Wygłodniałe zwierzęta";
        switch (diceSide) {
            case "palisade":
                this._game.constructionService.lvlDownOrGetHurt(
                    CONSTRUCTION.PALISADE,
                    1,
                    logSource
                );
                break;
            case "food":
                this._game.resourceService.spendBasicResourceOrGetHurt(
                    "food",
                    1,
                    logSource
                );
                break;
            case "beast":
                //TODO: implement fighting beast.
                break;
            case "blank":
                return;
        }
    }

    public rollDices(): void {
        if (this._rollDiceResult) {
            return;
        }
        let winter = null;
        let rain = null;
        let animals = null;

        if (this.shouldRollDice("winter")) {
            winter = RollDiceService.getWeatherRollDiceResult("winter", this._game.getRandomNumber);
        }
        if (this.shouldRollDice("rain")) {
            rain = RollDiceService.getWeatherRollDiceResult("rain", this._game.getRandomNumber);
        }

        if (this.shouldRollDice("animals")) {
            animals = RollDiceService.getWeatherRollDiceResult("animals", this._game.getRandomNumber);
        }
        this._rollDiceResult = {
            winter,
            rain,
            animals,
        };
    }

    private shouldRollDice(dice: WeatherDice) {
        const weatherDays = this._game.scenarioService.weather;
        return weatherDays[dice].includes(this._game.round);
    }
}
