import { Action } from "../Action";

import { IResolvableItem, IResolvableItemRenderData } from "./IResolvableItem";

export interface IResolvableActionService {
  action: Action;
  eventToken: boolean;
  reRollToken: boolean;
  additionalPawnRequired: boolean;
  items: IResolvableItem[];
  resolveNextItem: () => void;
  finished: boolean;
  renderData: IResolvableActionServiceRenderData;
  updateItems: () => void;
}

export enum RESOLVE_ITEM_STATUS {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  PENDING = "PENDING",
}

export interface IResolvableActionServiceRenderData {
  items: IResolvableItemRenderData[];
}
