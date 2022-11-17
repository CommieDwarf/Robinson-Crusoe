export type ActionCubeSide =
  | "hurt"
  | "mystery"
  | "success"
  | "determination"
  | "blank";

export type WeatherCubeSide =
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
  result: ActionCubeSide;
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

export interface WeatherRollDiceInfo {
  dice: WeatherType;
  results: {
    snow: RollDiceResult;
    rain: RollDiceResult;
    animals: RollDiceResult;
  };
}
