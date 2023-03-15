import { IBasicResources, IBasicResourcesAmount } from "../Resources/Resources";

export interface IConstructionRenderData {
  name: string;
  lvl: number;
  committedResources: IBasicResourcesAmount;
  cost: IBasicResourcesAmount;
  locked: boolean;
  requiredHelperAmount: number;
}

export interface IConstruction {
  name: CONSTRUCTION;
  namePL: string;
  lvl: number;
  committedResources: IBasicResources;
  cost: IBasicResources;
  locked: boolean;
  requiredHelperAmount: number;
  renderData: IConstructionRenderData;
  resourceChoice: boolean;
}

export enum CONSTRUCTION {
  SHELTER = "shelter",
  ROOF = "roof",
  PALISADE = "palisade",
  WEAPON = "weapon",
}
