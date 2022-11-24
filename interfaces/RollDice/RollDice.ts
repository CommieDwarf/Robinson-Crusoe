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

export interface RollDiceResult<DiceSide> {
  result: DiceSide;
  axes: {
    x: number;
    y: number;
    z: number;
  };
}

export interface ActionRollDiceInfo {
  type: DiceActionType;
  results: ActionResults;
}

export interface ActionResults {
  hurt: RollDiceResult<ActionDiceSide>;
  success: RollDiceResult<ActionDiceSide>;
  mystery: RollDiceResult<ActionDiceSide>;
}

export interface WeatherRollDiceInfo {
  type: "weather";
  results: WeatherResults;
}

export interface WeatherResults {
  snow: RollDiceResult<WeatherDiceSide> | null;
  rain: RollDiceResult<WeatherDiceSide> | null;
  animals: RollDiceResult<WeatherDiceSide> | null;
}
