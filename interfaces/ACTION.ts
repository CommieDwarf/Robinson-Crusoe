export enum ACTION {
  THREAT = "threat",
  HUNT = "hunt",
  BUILD = "build",
  GATHER = "gather",
  EXPLORE = "explore",
  ARRANGE_CAMP = "arrange camp",
  REST = "rest",
}

export type Action =
  | "arrange camp"
  | "rest"
  | "hunt"
  | "threat"
  | AdventureAction;
export type AdventureAction = "build" | "explore" | "gather";

