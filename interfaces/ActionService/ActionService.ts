import {
  ISpecificActionService,
  ISpecificActionServiceRenderData,
} from "./IActionResolvableService";
import { ACTION } from "../ACTION";
import { IResolvableItem, IResolvableItemRenderData } from "./IResolvableItem";

export interface IActionService {
  specificActionServices: ISpecificActionServices;
  finished: boolean;
  currentResolvableActionService: ISpecificActionService;
  renderData: IActionServiceRenderData;
  setNextAction: () => void;
  resolveItem: (action: ACTION, droppableId: string) => void;
  updateItems: () => void;
  lastResolvedItem: IResolvableItem | null;
}

export type ISpecificActionServices = {
  [key in ACTION]: ISpecificActionService;
};

export type ISpecificActionServicesRenderData = {
  [key in ACTION]: ISpecificActionServiceRenderData;
};

export interface IActionServiceRenderData {
  specificActionServices: ISpecificActionServicesRenderData;
  finished: boolean;
  currentResolve: ISpecificActionServiceRenderData;
  lastResolvedItem: IResolvableItemRenderData | null;
}
