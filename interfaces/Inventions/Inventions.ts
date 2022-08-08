import { IInvention } from "./Invention";
import { SCENARIO } from "../Scenario/Scenario";

export interface IInventions {
  inventions: IInvention[];
  scenario: SCENARIO;
  build: (name: InventionName) => void;
  destroy: (name: InventionName) => void;
  updateLocks: () => void;
  getInvention: (name: InventionName) => IInvention;
}

export type NormalInventionName =
  | "basket"
  | "bed"
  | "belts"
  | "bow"
  | "cellar"
  | "corral"
  | "diary"
  | "drums"
  | "furnace"
  | "lantern"
  | "moat"
  | "pit"
  | "raft"
  | "sack"
  | "shield"
  | "sling"
  | "wall";

export type PersonalInventionName =
  | "fireplace"
  | "shortcut"
  | "snare"
  | "spear";

export type StarterInventionName =
  | "bricks"
  | "cure"
  | "dam"
  | "fire"
  | "knife"
  | "map"
  | "pot"
  | "rope"
  | "shovel";

export type ScenarioInventionName = "axe" | "mast";

export type InventionName =
  | NormalInventionName
  | StarterInventionName
  | PersonalInventionName
  | ScenarioInventionName;
