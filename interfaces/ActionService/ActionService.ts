import { IResolvableItem, IResolvableItemRenderData } from "./IResolvableItem";
import { ACTION, AdventureAction } from "../ACTION";

export type ActionTokens = {
  build: boolean;
  gather: boolean;
  explore: boolean;
};

export interface IActionService {
  resolvableItems: IResolvableItem[];
  action: ACTION;
  finished: boolean;
  setNextAction: () => void;
  loadItems: () => void;
  resolve: (resolvableItemID: string) => void;
  rollDices: (resolvableItemID: string) => void;
  reRollSuccess: (resolvableItemID: string) => void;
  setAdventureToken: (
    action: AdventureAction,
    value: boolean,
    logSource: string
  ) => void;
  setReRollToken: (
    action: AdventureAction,
    value: boolean,
    sourceLog: string
  ) => void;
  currentActionResolved: boolean;
  lastRolledItem: IResolvableItem | null;
  renderData: IActionServiceRenderData;
  adventureTokens: ActionTokens;
  reRollTokens: ActionTokens;
}

export interface IActionServiceRenderData {
  resolvableItems: IResolvableItemRenderData[];
  action: ACTION;
  finished: boolean;
  currentActionResolved: boolean;
  lastRolledItem: IResolvableItemRenderData | null;
  adventureTokens: ActionTokens;
  reRollTokens: ActionTokens;
}
