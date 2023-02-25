import { IResources } from "../Resources/Resources";
import { CONSTRUCTION } from "../ConstructionService/Construction";
import { INVENTION_STARTER } from "../InventionService/Invention";
import { AdventureAction } from "../ACTION";

export interface IEventCardRenderData {
  id: string;
  name: string;
  type: AdventureAction | EVENT_TYPE;
  requiredHelperAmount: number;
}

export enum EVENT_TYPE {
  BOOK = "book",
  WRECKAGE = "wreckage",
}

export interface EventResolveRequirements {
  pawns: number;
  invention: INVENTION_STARTER | null;
  construction: {
    type: CONSTRUCTION;
    lvl: number;
  } | null;
  resource: IResources | null;
}

export interface IEventCard {
  id: string;
  name: string;
  namePL: string;
  resolutionPL: string;
  renderData: IEventCardRenderData;
  type: AdventureAction | EVENT_TYPE;
  requirements: EventResolveRequirements;
  requiredHelperAmount: number;

  triggerEventEffect(): void;

  fullFill(): void;

  triggerThreatEffect(): void;

  setAdventureToken: () => void;
}
