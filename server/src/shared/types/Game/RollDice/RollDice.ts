export interface diceAxes {
  x: number;
  y: number;
  z: number;
}

export interface ResultAxes {
  [key: string]: diceAxes;
}

export type ActionDiceSide =
  | "blank"
  | "hurt"
  | "mystery"
  | "success"
  | "determination";

export type WeatherDiceSide =
  | "blank"
  | "snow"
  | "double snow"
  | "rain"
  | "double rain"
  | "beast"
  | "palisade"
  | "food";

export type ActionDice = "mystery" | "hurt" | "success";
export type WeatherDice = "winter" | "rain" | "animals";

export interface ActionDiceResult {
  result: ActionDiceSide;
  axes: diceAxes;
}

export interface WeatherDiceResult {
  result: WeatherDiceSide;
  axes: diceAxes;
}

export type ActionDiceResults = {
  [key in ActionDice]: ActionDiceResult;
};

export type WeatherDiceResults = {
  [key in WeatherDice]: WeatherDiceResult | null;
};
