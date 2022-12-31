import {
  IConstruction,
  IConstructionRenderData,
  CONSTRUCTION,
} from "./Construction";
import { IResources } from "../Resources/Resources";

export interface IConstructionServiceRenderData {
  constructions: IConstructionRenderData[];
}

export interface IConstructionService {
  constructions: IConstruction[];
  lvlUpConstruction: (
    construction: CONSTRUCTION,
    by: number,
    logSource: string
  ) => void;
  lvlDownConstruction: (
    construction: CONSTRUCTION,
    by: number,
    logSource: string
  ) => void;
  lvlDownOrSuffer: (
    construction: CONSTRUCTION,
    by: number,
    logSource: string
  ) => void;
  lvlDownIfPossible: (
    construction: CONSTRUCTION,
    by: number,
    logSource: string
  ) => void;
  setLvl: (construction: CONSTRUCTION, lvl: number) => void;
  unlockConstruction: (construction: CONSTRUCTION) => void;
  lockConstruction: (construction: CONSTRUCTION) => void;
  unlockAllConstructions: () => void;
  commitResources: (construction: CONSTRUCTION, resources: IResources) => void;
  rollBackCommittedResources: (construction: CONSTRUCTION) => void;
  getConstruction: (construction: CONSTRUCTION) => IConstruction;
  renderData: IConstructionServiceRenderData;
}
