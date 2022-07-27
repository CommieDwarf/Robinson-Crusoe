import Pawn from "./Pawn";
import Resources from "./Resources";

export default interface IStructure {
  type: StructureType;
  level: number;
  committedResources: Resources;
  cost: Resources;
  locked: boolean;
  requiredHelpers: number;
}

export type StructureType = "shelter" | "roof" | "palisade" | "weapon";
