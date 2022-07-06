import { Pawn } from "./pawns";
import IStructure from "../interfaces/Structure";
import player from "./Players";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";



type StructureType = "shelter" | "roof" | "palisade" | "weapon";
interface CommitedResources {
  type: null | "wood" | "leather";
  quantity: number;
}

export class Structure implements IStructure {
  type: StructureType;
  level: number;
  commitedResources: CommitedResources;
  woodCost: number;
  leatherCost: number;
  locked: boolean;
  requiedHelpers: number;

  constructor(
    type: StructureType,
    level: number,
    commitedResources: CommitedResources,
    woodCost: number,
    leatherCost: number,
    locked: boolean,
    requiedHelpers: number
  ) {
    this.type = type;
    this.level = level;
    this.commitedResources = commitedResources;
    this.woodCost = woodCost;
    this.leatherCost = leatherCost;
    this.locked = locked;
    this.requiedHelpers = requiedHelpers;
  }
}

let structureNames: StructureType[] = ["shelter", "roof", "palisade", "weapon"];

const structures = structureNames.map((name) => {
    return new Structure(name, 0, {type: null, quantity: 0}, 3, 2, false, 1);
})

structures[3].leatherCost = 0;
structures[3].woodCost = 2;

export default structures;
