export type DiceActionType = "gather" | "explore" | "build";
export type ActionDice = "success" | "mystery" | "hurt";
export type ActionDiceSide =
  | "hurt"
  | "mystery"
  | "success"
  | "determination"
  | "blank";

export type WeatherDice = "animals" | "winter" | "rain";

export type AnimalDiceSide = "beast" | "palisade" | "food" | "blank";
export type RainDiceSide = "rain" | "doubleRain" | "snow" | "blank";
export type WinterDiceSide = "doubleRain" | "snow" | "doubleSnow" | "blank";
export type WeatherDiceSide = AnimalDiceSide | RainDiceSide | WinterDiceSide;

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
  winter: RollDiceResult<WinterDiceSide> | null;
  rain: RollDiceResult<RainDiceSide> | null;
  animals: RollDiceResult<AnimalDiceSide> | null;
}
