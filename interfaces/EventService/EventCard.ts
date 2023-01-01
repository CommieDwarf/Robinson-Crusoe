import { IResourcesAmount } from "../Resources/Resources";
import { CONSTRUCTION } from "../ConstructionService/Construction";
import { ICharacter } from "../Characters/Character";
import { INVENTION_STARTER } from "../InventionService/Invention";

export interface IEventCardRenderData {
  id: string;
  name: string;
  type: EVENT_TYPE;
  requiredHelperAmount: number;
}

export enum EVENT_TYPE {
  BOOK = "book",
  EXPLORE = "explore",
  GATHER = "gather",
  BUILD = "build",
  WRECKAGE = "wreckage",
}

export enum EVENT_CARD {
  ARGUMENT = "argument",
  AWFUL_WEATHER = "awful weather",
  UNUSUALLY_COLD_NIGHT = "unusually cold night",
  DANGEROUS_NIGHT = "dangerous night",
  CLOUD_BURST = "cloud burst",
  BROKEN_TREE = "broken tree",
  FIRE = "fire",
  HOWLING_FROM_THE_WOODS = "howling from the woods",
  NIGHT_HOWLING = "night howling",
  RAVISHING_WINDSTORM = "ravishing windstorm",
  RAIN = "rain",
  SLEEPLESS_NIGHT = "sleepless night",
}

export enum WRECKAGE_CARD {
  SUPPLY_CRATES = "supply crates",
}

export interface EventResolveRequirements {
  pawns: number;
  invention: INVENTION_STARTER | null;
  construction: {
    type: CONSTRUCTION;
    lvl: number;
  } | null;
  resource: IResourcesAmount | null;
}

export interface EventEffects {
  triggerEffect(): void;

  fullFill(character: ICharacter, helper: boolean): void;

  triggerThreatEffect(): void;
}

export interface IEventCard {
  id: string;
  name: string;
  renderData: IEventCardRenderData;
  type: EVENT_TYPE;
  requirements: EventResolveRequirements;
  requiredHelperAmount: number;

  triggerEffect(): void;

  fullFill(): void;

  triggerThreatEffect(): void;
}
