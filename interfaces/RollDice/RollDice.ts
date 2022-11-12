export type RollField =
  | "hurt"
  | "mystery"
  | "success"
  | "determination"
  | "blank";

export type NightRollCategory = "snow" | "rain" | "hungryAnimals";

export type ActionRollCategory = "gather" | "explore" | "build";

export type ActionRollCube = "hurt" | "success" | "mystery";

export interface RollDiceResult {
  result: number;
  axes: {
    x: number;
    y: number;
    z: number;
  };
}

export interface RollActionDiceInfo {
  category: ActionRollCategory;
  results: {
    hurt: RollDiceResult;
    success: RollDiceResult;
    mystery: RollDiceResult;
  };
}

export interface RollNightDiceInfo {
  results: {
    snow: RollDiceResult;
    rain: RollDiceResult;
    hungryAnimals: RollDiceResult;
  };
}
