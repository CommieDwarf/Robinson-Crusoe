import { IResources, IResourcesAmount } from "../Resources/Resources";

export interface IConstructionRenderData {
  name: string;
  lvl: number;
  committedResources: IResourcesAmount;
  cost: IResourcesAmount;
  locked: boolean;
  requiredHelperAmount: number;
}

export interface IConstruction {
  name: CONSTRUCTION;
  namePL: string;
  lvl: number;
  committedResources: IResources;
  cost: IResources;
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
