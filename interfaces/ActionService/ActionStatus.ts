import {Action} from "../Action";
import {IPawn, IPawnRenderData} from "../Pawns/Pawn";

export enum RESOLVE_ITEM_STATUS {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  PENDING = "PENDING",
}

export interface IResolvableItemRenderData {
  name: string,
  status: RESOLVE_ITEM_STATUS,
  leader: IPawnRenderData,

}

export interface IResolvableItem {
  name: string;
  status: RESOLVE_ITEM_STATUS;
  leader: IPawn;
  helpers: number;
  incrementHelpers: () => void;
  renderData: IResolvableItemRenderData;
}

export interface IActionStatusRenderData {
  items: IResolvableItemRenderData[];
}

export interface IActionStatus {
  action: Action;
  eventToken: boolean;
  reRollToken: boolean;
  additionalPawnRequired: boolean;
  items: IResolvableItem[];
  resolveNextItem: () => void;
  finished: boolean;
  renderData: IActionStatusRenderData;
}
