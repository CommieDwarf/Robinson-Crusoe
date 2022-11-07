import { IActionStatus, IActionStatusRenderData } from "./ActionStatus";

export interface Statuses {
  threat: IActionStatus;
  hunt: IActionStatus;
  build: IActionStatus;
  gather: IActionStatus;
  explore: IActionStatus;
  arrangeCamp: IActionStatus;
  rest: IActionStatus;
}

export interface IActionServiceRenderData {
  statuses: {
    threat: IActionStatusRenderData;
    hunt: IActionStatusRenderData;
    build: IActionStatusRenderData;
    gather: IActionStatusRenderData;
    explore: IActionStatusRenderData;
    arrangeCamp: IActionStatusRenderData;
    rest: IActionStatusRenderData;
  };
  finished: boolean;
  currentResolve: keyof Statuses;
}

export interface IActionService {
  statuses: Statuses;
  finished: boolean;
  currentResolve: keyof Statuses;
  resolveNext: () => void;
  renderData: IActionServiceRenderData;
  setNextAction: () => void;
}
