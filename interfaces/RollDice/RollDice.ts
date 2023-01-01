import { ACTION } from "../ACTION";

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
  | "doubleSnow"
  | "rain"
  | "doubleRain"
  | "beast"
  | "palisade"
  | "food";

export type DICE_ACTION_TYPE = ACTION.EXPLORE | ACTION.GATHER | ACTION.BUILD;

export type ActionDice = "mystery" | "hurt" | "success";
export type WeatherDice = "winter" | "rain" | "animals";

export interface ActionDiceResult {
  result: ActionDiceSide;
  axes: diceAxes;
}

export type ActionDiceResults = {
  [key in ActionDice]: ActionDiceResult;
};
