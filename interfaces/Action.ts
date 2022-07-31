export type Action =
  | "hunt"
  | "explore"
  | "gather"
  | "build"
  | "threat"
  | "rest"
  | "arrangeCamp";

export type HelperAction = Exclude<Action, "threat" | "rest" | "arrangeCamp">;
