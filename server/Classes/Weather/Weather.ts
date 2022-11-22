import {
  IWeather,
  OverallWeather,
  WeatherStatus,
} from "../../../interfaces/Weather/Weather";
import { IGame } from "../../../interfaces/Game";
import {
  RollDiceResult,
  WeatherResults,
  WeatherRollDiceInfo,
  WeatherType,
} from "../../../interfaces/RollDice/RollDice";
import Entries from "../../../interfaces/Entries";
import { RollDiceService } from "../RollDiceService/RollDiceService";
import { WeatherDays } from "../../../interfaces/ScenarioService/ScenarioService";

export class Weather implements IWeather {
  private _tokens: WeatherStatus = {
    snow: false,
    rain: false,
    animals: false,
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

  get overallWeather() {
    let overallWeather = {
      snow: 0,
      rain: 0,
      animals: 0,
    };
    if (this._rollDiceResult) {
      const entries = Object.entries(
        this._rollDiceResult?.results
      ) as Entries<WeatherResults>;
      entries.forEach(([key, value]) => {
        if (value?.result.includes("double")) {
          overallWeather[key] += 2;
        } else if (!value?.result.includes("blank")) {
          overallWeather[key]++;
        }
      });
    }
    const entries = Object.entries(this._tokens) as Entries<WeatherStatus>;
    entries.forEach(([key, value]) => {
      if (value) {
        overallWeather[key]++;
      }
    });

    return overallWeather;
  }

  get tokens(): WeatherStatus {
    return this._tokens;
  }

  get rollDiceResult(): WeatherRollDiceInfo | null {
    return this._rollDiceResult;
  }

  setToken(type: WeatherType, value: boolean) {
    this._tokens[type] = value;
  }

  public applyEffects() {
    const weather = this.overallWeather;
    this.applySnowEffect(weather.snow);
    this.applySnowAndRain(weather.snow, weather.rain);
    this.applyAnimalsEffect();
    this.resetWeather();
  }

  private resetWeather() {
    this._tokens = {
      animals: false,
      snow: false,
      rain: false,
    };
    this._rollDiceResult = null;
  }

  private applySnowEffect(snow: number) {
    const wood = this._game.allResources.owned.amount.get("wood");
    if (!wood) {
      throw new Error("Can't find wood in allResources owned amount");
    }
    const diff = snow - wood;
    if (diff < 0) {
      this._game.characterService.hurtAllPlayerCharacters(
        Math.abs(diff),
        `Śnieg: Brakuje ${Math.abs(diff)} drewna`
      );
      this._game.allResources.spendFromOwned(
        "wood",
        Math.abs(diff),
        "Śnieg: Ogrzewanie drewnem"
      );
    } else {
      this._game.allResources.spendFromOwned(
        "wood",
        wood,
        "Śnieg: Ogrzewanie drewnem"
      );
    }
  }

  private applySnowAndRain(snow: number, rain: number) {
    const sum = snow + rain;
    const diff = this._game.structuresService.getStruct("roof").lvl - sum;

    if (diff < 0) {
      this.applyResourceRoofEffect("wood", sum, diff);
      this.applyResourceRoofEffect("food", sum, diff);
    }
  }

  private applyResourceRoofEffect(
    resource: "wood" | "food",
    amount: number,
    diff: number
  ) {
    const absoluteDiff = Math.abs(diff);
    const messageSource = `Pogoda: Brakuje ${absoluteDiff} poziomów dachu`;
    if (this._game.allResources.owned.getResource(resource) < absoluteDiff) {
      this._game.characterService.hurtAllPlayerCharacters(
        absoluteDiff,
        messageSource
      );
      this._game.allResources.spendFromOwned(
        resource,
        absoluteDiff,
        messageSource
      );
    } else {
      this._game.allResources.spendFromOwned(resource, amount, messageSource);
    }
  }

  private applyAnimalsEffect() {
    const msgSource = "Wygłodniałe zwierzęta";
    switch (this._rollDiceResult?.results.animals?.result) {
      case "palisade":
        if (this._rollDiceResult?.results.animals?.result === "palisade") {
          if (this._game.structuresService.getStruct("palisade").lvl === 0) {
            this._game.characterService.hurtAllPlayerCharacters(1, msgSource);
          } else {
            this._game.structuresService.lvlDownStruct(
              "palisade",
              1,
              msgSource
            );
          }
        }
        break;
      case "food":
        if (this._game.allResources.owned.getResource("food") === 0) {
          this._game.characterService.hurtAllPlayerCharacters(1, msgSource);
        } else {
          this._game.allResources.spendFromOwned("food", 1, msgSource);
        }
        break;
      case "beast":
        //TODO: implement fighting beast.
        break;
    }
  }

  private rollDices(): void {
    const weatherRollDiceInfo: WeatherRollDiceInfo = {
      results: {
        snow: null,
        rain: null,
        animals: null,
      },
    };
    const entries = Object.entries(
      this._game.scenarioService.weather
    ) as Entries<WeatherDays>;
    entries.forEach(([weatherType, dayArray]) => {
      if (dayArray.includes(this._game.turn)) {
        weatherRollDiceInfo.results[weatherType] =
          RollDiceService.getWeatherRollDiceResult(weatherType);
      }
    });

    this._rollDiceResult = weatherRollDiceInfo;
  }
}
