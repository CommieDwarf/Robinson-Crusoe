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

export type ACTION_HELPER = Exclude<
  ACTION,
  ACTION.THREAT | ACTION.REST | ACTION.ARRANGE_CAMP
>;

export type ACTION_DOG = Exclude<
  ACTION,
  | ACTION.THREAT
  | ACTION.REST
  | ACTION.ARRANGE_CAMP
  | ACTION.BUILD
  | ACTION.GATHER
>;
