import { IStructure, IStructureRenderData, STRUCTURE } from "./Structure";
import { IResources } from "../Resources/Resources";

export interface IStructuresServiceRenderData {
  structures: IStructureRenderData[];
}

export type StructureName = "shelter" | "roof" | "palisade" | "weapon";

export interface IStructuresService {
  structures: IStructure[];
  lvlUpStruct: (name: StructureName, by: number, logSource: string) => void;
  lvlDownStruct: (name: StructureName, by: number, logSource: string) => void;
  lvlDownOrSuffer: (name: StructureName, by: number, logSource: string) => void;
  setLvl: (name: StructureName, lvl: number) => void;
  unlockStruct: (name: StructureName) => void;
  lockStruct: (name: StructureName) => void;
  unlockAllStructs: () => void;
  commitResources: (name: StructureName, resources: IResources) => void;
  rollBackCommittedResources: (name: StructureName) => void;
  getStruct: (name: StructureName) => IStructure;
  renderData: IStructuresServiceRenderData;
}
