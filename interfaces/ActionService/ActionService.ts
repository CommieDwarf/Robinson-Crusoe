import {
  IResolvableActionService,
  IResolvableActionServiceRenderData,
} from "./IActionResolvableService";

export interface IActionService {
  resolvableActionServices: IResolvableActionServices;
  finished: boolean;
  currentResolve: keyof IResolvableActionServices;
  resolveNext: () => void;
  renderData: IActionServiceRenderData;
  setNextAction: () => void;
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
  currentResolve: keyof IResolvableActionServices;
}
