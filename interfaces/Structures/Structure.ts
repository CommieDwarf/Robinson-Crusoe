import { IResources } from "../Resources/Resources";

export enum STRUCTURE {
  SHELTER = "shelter",
  ROOF = "roof",
  PALISADE = "palisade",
  WEAPON = "weapon",
}

export interface IStructure {
  name: STRUCTURE;
  lvl: number;
  committedResources: IResources;
  cost: IResources;
  locked: boolean;
  requiredHelpers: number;
}
