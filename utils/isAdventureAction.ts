import { Action, AdventureAction } from "../interfaces/ACTION";

export const isAdventureAction = (
  candidate: Action
): candidate is AdventureAction => {
  return (
    candidate === "build" || candidate === "explore" || candidate === "gather"
  );
};
