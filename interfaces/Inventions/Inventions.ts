import { IInvention, IInventionRenderData } from "./Invention";
import { ICharacter } from "../Characters/Character";

export interface IInventionsServiceRenderData {
  inventions: IInventionRenderData[];
}

export interface IInventionsService {
  inventions: IInvention[];
  scenario: string;
  build: (name: InventionName, builder: ICharacter) => void;
  destroy: (name: InventionName) => void;
  updateLocks: () => void;
  getInvention: (name: InventionName) => IInvention;
  renderData: IInventionsServiceRenderData;
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
  | "medicine"
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
