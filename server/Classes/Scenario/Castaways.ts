import {
  IScenarioService,
  IScenarioServiceRenderData,
  SCENARIO_STATUS,
  ScenarioText,
  WeatherDays,
} from "../../../interfaces/ScenarioService/ScenarioService";
import { castaways } from "../../../constants/scenarios/castaways";
import { IGame } from "../../../interfaces/Game";

export class Castaways implements IScenarioService {
  get name(): "castaways" {
    return this._name;
  }

  get woodStashLvl(): number {
    return this._woodStashLvl;
  }

  private _text: ScenarioText = castaways.text;
  private _status = SCENARIO_STATUS.PENDING;
  private _weather: WeatherDays = castaways.weather;
  private readonly _game: IGame;
  private _woodStashLvl: number = 1;
  private _name: "castaways" = "castaways";

  constructor(game: IGame) {
    this._game = game;
  }

  get renderData(): IScenarioServiceRenderData {
    return {
      text: this._text,
      weather: this._weather,
      status: this._status,
    };
  }

  set status(value: SCENARIO_STATUS) {
    this._status = value;
  }

  get text(): ScenarioText {
    return this._text;
  }

  get status(): SCENARIO_STATUS {
    return this._status;
  }

  get weather(): WeatherDays {
    return this._weather;
  }

  checkStatus(): void {
    if (
      this._woodStashLvl === 5 &&
      this._game.round >= 10 &&
      this._game.round <= 12
    ) {
      this._status = SCENARIO_STATUS.WIN;
    } else if (this._game.round > 12) {
      this._status = SCENARIO_STATUS.DEFEAT;
    }
  }
}
