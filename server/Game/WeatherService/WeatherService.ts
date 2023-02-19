import {
  IWeatherService,
  IWeatherTokens,
  OverallWeather,
  WeatherModifiers,
} from "../../../interfaces/Weather/Weather";
import { IGame } from "../../../interfaces/Game";
import {
  WeatherDice,
  WeatherDiceResults,
  WeatherDiceSide,
} from "../../../interfaces/RollDice/RollDice";
import { RollDiceService } from "../RollDiceService/RollDiceService";
import { CONSTRUCTION } from "../../../interfaces/ConstructionService/Construction";

export class WeatherService implements IWeatherService {
  private _tokens: IWeatherTokens = {
    snow: true,
    rain: true,
    storm: true,
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
      overallWeather: this.overallWeather,
      shouldRollDices: this.shouldRollDices,
    };
  }

  get overallWeather(): OverallWeather {
    const animals = this._rollDiceResult?.animals;

    let { rain, snow } = this.countClouds();
    rain += this._modifiers.rain;
    snow += this._modifiers.snow;
    rain = rain < 0 ? 0 : rain;
    snow = snow < 0 ? 0 : snow;
    return {
      snow,
      rain,
      storm: this._tokens.storm,
      animals: animals || null,
    };
  }

  setToken(token: keyof IWeatherTokens, value: boolean) {
    this._tokens[token] = value;
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

  incrementModifier(type: keyof WeatherModifiers, value: number) {
    this._modifiers[type] += value;
  }

  public applyEffects() {
    const weather = this.overallWeather;
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
    this._game.resourceService.spendResourceOrGetHurt(
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
      this._game.resourceService.spendResourceOrGetHurt(
        "wood",
        Math.abs(diff),
        "Opady"
      );
      this._game.resourceService.spendResourceOrGetHurt(
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
        this._game.constructionService.lvlDownOrSuffer(
          CONSTRUCTION.PALISADE,
          1,
          logSource
        );
        break;
      case "food":
        this._game.resourceService.spendResourceOrGetHurt("food", 1, logSource);
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
      winter = RollDiceService.getWeatherRollDiceResult("winter");
    }
    if (this.shouldRollDice("rain")) {
      rain = RollDiceService.getWeatherRollDiceResult("rain");
    }

    if (this.shouldRollDice("animals")) {
      animals = RollDiceService.getWeatherRollDiceResult("animals");
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
