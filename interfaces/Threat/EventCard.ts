import { IResourcesAmount } from "../Resources/Resources";
import { STRUCTURE } from "../Structures/Structure";
import { ICharacter } from "../Characters/Character";
import { EVENT_CARD_PL } from "../TRANSLATE_PL/CATEGORIES/EVENT_CARD_PL";

export interface IEventCardRenderData {
  id: number;
  name: string;
  type: EVENT_TYPE;
}

export enum EVENT_TYPE {
  book = "book",
  explore = "explore",
  gather = "gather",
  build = "build",
  wreckage = "wreckage",
}

export interface Requirements {
  pawns: number;
  optionalPawns: number | null;
  invention: string | null;
  structure: {
    type: STRUCTURE;
    amount: number;
  } | null;
  resource: IResourcesAmount | null;
}

export interface EventEffects {
  triggerEffect(): void;

  fullFill(character: ICharacter, helper: boolean): void;

  triggerThreatEffect(): void;
}

export interface IEventCard {
  id: number;
  name: string;
  namePL: EVENT_CARD_PL;
  renderData: IEventCardRenderData;
  type: EVENT_TYPE;
  pawnsAssigned: number;
  requirements: Requirements;

  triggerEffect(): void;

  fullFill(character: ICharacter, helper: boolean): void;

  triggerThreatEffect(): void;
}
