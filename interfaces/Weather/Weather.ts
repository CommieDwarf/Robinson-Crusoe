import { WeatherDiceSide, WeatherRollDiceInfo } from "../RollDice/RollDice";

export interface IWeatherTokens {
  rain: boolean;
  snow: boolean;
  storm: boolean;
}

export interface OverallWeather {
  rain: number;
  snow: number;
  animals: WeatherDiceSide | null;
  storm: boolean;
}

export interface IWeatherService {
  tokens: IWeatherTokens;
  overallWeather: OverallWeather;
  rollDiceResult: WeatherRollDiceInfo | null;
  setToken: (type: keyof IWeatherTokens, value: boolean) => void;
  applyEffects: () => void;
  renderData: IWeatherServiceRenderData;
  rollDices: () => void;
}

export interface IWeatherServiceRenderData {
  tokens: IWeatherTokens;
  overallWeather: OverallWeather;
  rollDiceResult: WeatherRollDiceInfo | null;
}
