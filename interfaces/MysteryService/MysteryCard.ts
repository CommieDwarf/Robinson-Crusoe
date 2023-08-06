import { IPlayerCharacter } from "../Characters/Character";

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
  triggerDrawEffect: (drawer: IPlayerCharacter) => void;
  triggerEventEffect: () => void;
  uses: number;
  use: (...args: any[]) => void;
  renderData: IMysteryCardRenderData;
}

export interface IMysteryCardRenderData {
  name: string;
  namePL: string;
  type: MYSTERY_CARD_TYPE;
  shuffleable: boolean;
}
