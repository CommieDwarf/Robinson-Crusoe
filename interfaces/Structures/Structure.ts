import { IResources, IResourcesAmount } from "../Resources/Resources";

export enum STRUCTURE {
  SHELTER = "shelter",
  ROOF = "roof",
  PALISADE = "palisade",
  WEAPON = "weapon",
}

export interface IStructureRenderData {
  name: STRUCTURE;
  lvl: number;
  committedResources: IResourcesAmount;
  cost: IResourcesAmount;
  locked: boolean;
  requiredHelpersAmount: number;
}

export interface IStructure {
  name: STRUCTURE;
  lvl: number;
  committedResources: IResources;
  cost: IResources;
  locked: boolean;
  requiredHelpersAmount: number;
}
