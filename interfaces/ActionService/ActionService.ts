import {
  IResolvableActionService,
  IResolvableActionServiceRenderData,
} from "./IActionResolvableService";
import { Action } from "../Action";

export interface IActionService {
  resolvableActionServices: IResolvableActionServices;
  finished: boolean;
  currentResolvableActionService: IResolvableActionService;
  renderData: IActionServiceRenderData;
  setNextAction: () => void;
  resolveItem: (action: Action, droppableId: string) => void;
}

export interface IResolvableActionServices {
  threat: IResolvableActionService;
  hunt: IResolvableActionService;
  build: IResolvableActionService;
  gather: IResolvableActionService;
  explore: IResolvableActionService;
  arrangeCamp: IResolvableActionService;
  rest: IResolvableActionService;
}

export interface IActionServiceRenderData {
  statuses: {
    threat: IResolvableActionServiceRenderData;
    hunt: IResolvableActionServiceRenderData;
    build: IResolvableActionServiceRenderData;
    gather: IResolvableActionServiceRenderData;
    explore: IResolvableActionServiceRenderData;
    arrangeCamp: IResolvableActionServiceRenderData;
    rest: IResolvableActionServiceRenderData;
  };
  finished: boolean;
  currentResolve: IResolvableActionServiceRenderData;
}
