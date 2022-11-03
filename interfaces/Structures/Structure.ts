import { IResources, IResourcesAmount } from "../Resources/Resources";
import { StructureName } from "./Structures";

export enum STRUCTURE {
  SHELTER = "shelter",
  ROOF = "roof",
  PALISADE = "palisade",
  WEAPON = "weapon",
}

export interface IStructureRenderData {
  name: StructureName;
  lvl: number;
  committedResources: IResourcesAmount;
  cost: IResourcesAmount;
  locked: boolean;
  requiredHelpersAmount: number;
}

export interface IStructure {
  name: StructureName;
  lvl: number;
  committedResources: IResources;
  cost: IResources;
  locked: boolean;
  requiredHelpersAmount: number;
  renderData: IStructureRenderData;
}
