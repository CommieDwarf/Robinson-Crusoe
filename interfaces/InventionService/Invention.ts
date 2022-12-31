import { TERRAIN_TYPE } from "../TileService/ITile";
import { IResources, IResourcesAmount } from "../Resources/Resources";
import { CHARACTER, ICharacter } from "../Characters/Character";

export interface IInventionRenderData {
  name: string;
  locked: boolean;
  requiredHelpersModifier: number;
  requiredHelpersAmount: number;
  type: INVENTION_TYPE;
  committedResources: IResourcesAmount;
  isBuilt: boolean;
}

export interface IInvention {
  name: string;
  locked: boolean;
  requiredHelpersModifier: number;
  requiredHelpersAmount: number;
  type: INVENTION_TYPE;
  committedResources: IResources;
  isBuilt: boolean;
  cost: IResources | null;
  requirements: InventionRequirements;
  belongsTo: CHARACTER | null;
  resourceChoice: boolean;
  usable: boolean;
  used: boolean;

  onBuild: () => void;
  onDestruction: () => void;
  onNextRound: () => void;
  use: (character: ICharacter) => void;

  renderData: IInventionRenderData;
}

export interface InventionRequirements {
  inventions: INVENTION[] | null;
  terrainType: TERRAIN_TYPE | null;
}

export enum INVENTION_NORMAL {
  BASKET = "basket",
  BED = "bed",
  BELTS = "belts",
  BOW = "bow",
  CELLAR = "cellar",
  CORRAL = "corral",
  DIARY = "diary",
  DRUMS = "drums",
  FURNACE = "furnace",
  LANTERN = "lantern",
  MOAT = "moat",
  PIT = "pit",
  RAFT = "raft",
  SACK = "sack",
  SHIELD = "shield",
  SLING = "sling",
  WALL = "wall",
}

export enum INVENTION_PERSONAL {
  FIREPLACE = "fireplace",
  SNARE = "snare",
  SHORTCUT = "shortcut",
  SPEAR = "spear",
}

export enum INVENTION_STARTER {
  BRICKS = "bricks",
  MEDICINE = "medicine",
  DAM = "dam",
  FIRE = "fire",
  KNIFE = "knife",
  MAP = "map",
  POT = "pot",
  ROPE = "rope",
  SHOVEL = "shovel",
}

export enum INVENTION_CASTAWAYS {
  AXE = "axe",
  MAST = "mast",
}

export enum INVENTION_TYPE {
  NORMAL = "normal",
  STARTER = "starter",
  PERSONAL = "personal",
  SCENARIO = "scenario",
}

export type INVENTION =
  | INVENTION_NORMAL
  | INVENTION_STARTER
  | INVENTION_PERSONAL
  | INVENTION_CASTAWAYS;
