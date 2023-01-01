import { IResolvableItem, IResolvableItemRenderData } from "./IResolvableItem";
import { ACTION } from "../ACTION";

export interface IActionService {
  resolvableItems: IResolvableItem[];
  action: ACTION;
  finished: boolean;
  setNextAction: () => void;
  loadItems: () => void;
  resolve: (resolvableItemID: string) => void;
}

export interface IActionServiceRenderData {
  resolvableItems: IResolvableItemRenderData[];
  action: ACTION;
  finished: boolean;
}
