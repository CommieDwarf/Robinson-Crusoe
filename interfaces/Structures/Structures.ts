import { IStructure, STRUCTURE_NAMES } from "./Structure";
import { IResources } from "../Resources/Resources";

export interface IStructures {
  structures: IStructure[];
  lvlUpStruct: (name: STRUCTURE_NAMES, by: number) => void;
  lvlDownStruct: (name: STRUCTURE_NAMES, by: number) => void;
  unlockStruct: (name: STRUCTURE_NAMES) => void;
  lockStruct: (name: STRUCTURE_NAMES) => void;
  unlockAllStructs: () => void;
  commitResources: (name: STRUCTURE_NAMES, resources: IResources) => void;
  rollBackCommittedResources: (name: STRUCTURE_NAMES) => void;
  getStruct: (name: STRUCTURE_NAMES) => IStructure;
}
