import { Resources } from "../server/Classes/AllResources/AllResources";

export enum STRUCTURE_NAMES {
  SHELTER = "shelter",
  ROOF = "roof",
  PALISADE = "palisade",
  WEAPON = "weapon",
}

export interface IStructure {
  name: STRUCTURE_NAMES;
  lvl: number;
  committedResources: Resources;
  cost: Resources;
  locked: boolean;
  requiredHelpers: number;
}
