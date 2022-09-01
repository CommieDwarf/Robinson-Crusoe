import { IStructure, IStructureRenderData, STRUCTURE } from "./Structure";
import { IResources } from "../Resources/Resources";

export interface IStructuresServiceRenderData {
  structures: IStructureRenderData[];
}

export interface IStructuresService {
  structures: IStructure[];
  lvlUpStruct: (name: STRUCTURE, by: number) => void;
  lvlDownStruct: (name: STRUCTURE, by: number) => void;
  unlockStruct: (name: STRUCTURE) => void;
  lockStruct: (name: STRUCTURE) => void;
  unlockAllStructs: () => void;
  commitResources: (name: STRUCTURE, resources: IResources) => void;
  rollBackCommittedResources: (name: STRUCTURE) => void;
  getStruct: (name: STRUCTURE) => IStructure;
  renderData: IStructuresServiceRenderData;
}
