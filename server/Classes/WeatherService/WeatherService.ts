import {
  IWeatherService,
  OverallWeather,
  IWeatherTokens,
  WeatherModifiers,
} from "../../../interfaces/Weather/Weather";
import { IGame } from "../../../interfaces/Game";
import {
  AnimalDiceSide,
  RainDiceSide,
  WeatherDice,
  WeatherRollDiceInfo,
  WinterDiceSide,
} from "../../../interfaces/RollDice/RollDice";
import { RollDiceService } from "../RollDiceService/RollDiceService";

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

  private readonly _game: IGame;
  private _rollDiceResult: WeatherRollDiceInfo | null = null;

  constructor(game: IGame) {
    this._game = game;
  }

  get renderData() {
    return {
      tokens: this._tokens,
      rollDiceResult: this._rollDiceResult,
      overallWeather: this.overallWeather,
    };
  }

  get overallWeather(): OverallWeather {
    const animals = this._rollDiceResult?.results.animals?.result
      ? this._rollDiceResult?.results.animals?.result
      : null;

    let { rain, snow } = this.countClouds();
    rain += this._modifiers.rain;
    snow += this._modifiers.snow;
    rain = rain < 0 ? 0 : rain;
    snow = snow < 0 ? 0 : snow;
    return {
      snow,
      rain,
      storm: this._tokens.storm,
      animals,
    };
  }

  setToken(token: keyof IWeatherTokens, value: boolean) {
    this._tokens[token] = value;
  }

  get tokens(): IWeatherTokens {
    return this._tokens;
  }

  get rollDiceResult(): WeatherRollDiceInfo | null {
    return this._rollDiceResult;
  }

  get modifiers(): WeatherModifiers {
    return this._modifiers;
  }

  incrementModifier(type: keyof WeatherModifiers, value: number) {
    this._modifiers[type] += value;
  }

  public applyEffects() {
    const weather = this.overallWeather;
    this.applySnowEffect(weather.snow);
    this.applySnowAndRain(weather.snow, weather.rain);
    this.applyAnimalsEffect(weather.animals);
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
      const rainResult = this._rollDiceResult.results.rain?.result;
      const snowResult = this._rollDiceResult.results.winter?.result;
      const results = [rainResult, snowResult];
      results.forEach((result) => {
        if (result) {
          switch (result) {
            case "rain":
              rain += 1;
              break;
            case "doubleRain":
              rain += 2;
              break;
            case "snow":
              snow += 1;
              break;
            case "doubleSnow":
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
    this._game.allResources.spendOrSuffer("wood", snow, "Drewno na opał");
  }

  private applySnowAndRain(snow: number, rain: number) {
    const sum = snow + rain;
    const diff = this._game.structuresService.getStruct("roof").lvl - sum;
    if (diff < 0) {
      this._game.allResources.spendOrSuffer("wood", Math.abs(diff), "Opady");
      this._game.allResources.spendOrSuffer("food", Math.abs(diff), "Opady");
    }
  }

  private applyAnimalsEffect(diceSide: AnimalDiceSide) {
    const logSource = "Wygłodniałe zwierzęta";
    switch (diceSide) {
      case "palisade":
        this._game.structuresService.lvlDownOrSuffer("palisade", 1, logSource);
        break;
      case "food":
        this._game.allResources.spendOrSuffer("food", 1, logSource);
        break;
      case "beast":
        //TODO: implement fighting beast.
        break;
    }
  }

  public rollDices(): void {
    if (this._rollDiceResult) {
      return;
    }
    const weatherRollDiceInfo: WeatherRollDiceInfo = {
      type: "weather",
      results: {
        winter: null,
        rain: null,
        animals: null,
      },
    };

    if (this.shouldRollDice("winter")) {
      weatherRollDiceInfo.results.winter =
        RollDiceService.getWeatherRollDiceResult<WinterDiceSide>("winter");
    }
    if (this.shouldRollDice("rain")) {
      weatherRollDiceInfo.results.rain =
        RollDiceService.getWeatherRollDiceResult<RainDiceSide>("rain");
    }

    if (this.shouldRollDice("animals")) {
      weatherRollDiceInfo.results.animals =
        RollDiceService.getWeatherRollDiceResult<AnimalDiceSide>("animals");
    }

    this._rollDiceResult = weatherRollDiceInfo;
  }

  private shouldRollDice(dice: WeatherDice) {
    const weatherDays = this._game.scenarioService.weather;
    return weatherDays[dice].includes(this._game.round);
  }
}
