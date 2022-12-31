import { AnimalDiceSide, WeatherRollDiceInfo } from "../RollDice/RollDice";

export interface IWeatherTokens {
  rain: boolean;
  snow: boolean;
  storm: boolean;
}

export interface OverallWeather {
  rain: number;
  snow: number;
  animals: AnimalDiceSide | null;
  storm: boolean;
}

export interface WeatherModifiers {
  rain: number;
  snow: number;
}

export interface IWeatherService {
  tokens: IWeatherTokens;
  modifiers: WeatherModifiers;
  overallWeather: OverallWeather;
  rollDiceResult: WeatherRollDiceInfo | null;
  furnace: boolean;
  setToken: (type: keyof IWeatherTokens, value: boolean) => void;
  rollDices: () => void;
  incrementModifier: (
    type: keyof WeatherModifiers,
    value: number,
    sourceLog: string
  ) => void;
  applyEffects: () => void;
  renderData: IWeatherServiceRenderData;
}

export interface IWeatherServiceRenderData {
  tokens: IWeatherTokens;
  overallWeather: OverallWeather;
  rollDiceResult: WeatherRollDiceInfo | null;
}
