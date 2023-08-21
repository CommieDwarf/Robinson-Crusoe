import { IPlayerCharacter } from "../Characters/PlayerCharacter";
import { IBasicResourcesAmount } from "../Resources/Resources";

export enum MYSTERY_CARD_TYPE {
  CREATURE = "creature",
  TRAP = "trap",
  TREASURE = "treasure",
}

export interface IMysteryCard {
  name: string;
  namePL: string;
  type: MYSTERY_CARD_TYPE;
  shuffleable: boolean;
  eventName: string;
  requiresTarget: boolean;
  drawLabel: string;
  drawResolved: boolean;
  triggerDrawEffect: (drawer: IPlayerCharacter) => void;
  triggerEventEffect: () => void;
  uses: number;
  use: (...args: any[]) => void;
  getRenderData(): IMysteryCardRenderData;
}

export interface IMysteryCardRenderData {
  name: string;
  namePL: string;
  type: MYSTERY_CARD_TYPE;
  shuffleable: boolean;
  drawLabel: string;
  drawResolved: boolean;
  eventLabel: string;
  uses: number;
  usedCount: number;
  stored?: IBasicResourcesAmount;
}
