import { ACTION } from "../ACTION";

import { IResolvableItem, IResolvableItemRenderData } from "./IResolvableItem";

export interface ISpecificActionService {
  action: ACTION;
  eventToken: boolean;
  reRollToken: boolean;
  helperAmountRequired: number;
  items: IResolvableItem[];
  finished: boolean;
  renderData: ISpecificActionServiceRenderData;
  updateItems: () => void;
  clearItems: () => void;
  resolveItem: (droppableId: string) => void;
  getItem: (droppableId: string) => IResolvableItem;
}

export enum RESOLVE_ITEM_STATUS {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  PENDING = "PENDING",
}

export interface ISpecificActionServiceRenderData {
  items: IResolvableItemRenderData[];
  finished: boolean;
  action: ACTION;
}
