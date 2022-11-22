import { WeatherRollDiceInfo, WeatherType } from "../RollDice/RollDice";

export interface WeatherStatus {
  rain: boolean;
  snow: boolean;
  animals: boolean;
}

export interface OverallWeather {
  rain: number;
  snow: number;
  animals: number;
}

export interface IWeather {
  tokens: WeatherStatus;
  overallWeather: OverallWeather;
  rollDiceResult: WeatherRollDiceInfo | null;
  setToken: (type: WeatherType, value: boolean) => void;
  applyEffects: () => void;
  renderData: IWeatherRenderData;
}

export interface IWeatherRenderData {
  tokens: WeatherStatus;
  overallWeather: OverallWeather;
  rollDiceResult: WeatherRollDiceInfo | null;
}
