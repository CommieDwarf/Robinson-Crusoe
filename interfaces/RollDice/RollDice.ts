export type ActionDiceSide =
  | "hurt"
  | "mystery"
  | "success"
  | "determination"
  | "blank";

export type WeatherDiceSide =
  | "rain"
  | "doubleRain"
  | "snow"
  | "doubleSnow"
  | "food"
  | "beast"
  | "palisade"
  | "blank";

export type WeatherType = "snow" | "rain" | "animals";
export type DiceActionType = "gather" | "explore" | "build";
export type WeatherDice = "animals" | "snow" | "rain";
export type ActionDice = "success" | "mystery" | "hurt";

export interface RollDiceResult {
  result: ActionDiceSide | WeatherDiceSide;
  axes: {
    x: number;
    y: number;
    z: number;
  };
}

export interface ActionRollDiceInfo {
  type: DiceActionType;
  results: {
    hurt: RollDiceResult;
    success: RollDiceResult;
    mystery: RollDiceResult;
  };
}

export interface WeatherResults {
  snow: RollDiceResult | null;
  rain: RollDiceResult | null;
  animals: RollDiceResult | null;
}

export interface WeatherRollDiceInfo {
  results: WeatherResults;
}
