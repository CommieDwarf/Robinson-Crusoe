import { IResources, IResourcesAmount } from "../Resources/Resources";
import { Actions } from "@reduxjs/toolkit";
import { IGame } from "../Game";
import { STRUCTURE } from "../Structures/Structure";

export interface IEventCardRenderData {
  id: number;
  name: string;
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

  fullFill(): void;

  triggerThreatEffect(): void;
}

export interface IEventCard {
  id: number;
  name: string;
  namePL: string;
  reward: unknown;
  extraReward: unknown;
  renderData: IEventCardRenderData;
  type: EVENT_TYPE;
  pawnsAssigned: number;
  requirements: Requirements;
  effects: EventEffects;
}
