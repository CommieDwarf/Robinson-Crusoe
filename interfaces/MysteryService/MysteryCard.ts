import { IPlayerCharacter } from "../Characters/PlayerCharacter";
import { ICharacter } from "../Characters/Character";

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
  triggerDrawEffect: (drawer: ICharacter) => void;
  triggerEventEffect: () => void;
  renderData: IMysteryCardRenderData;
}

export interface ITreasureMysteryCard extends IMysteryCard {
  uses: number;
  use: (target: ICharacter | null) => void;
  renderData: ITreasureMysteryCardRenderData;
}

export interface IMysteryCardRenderData {
  name: string;
  namePL: string;
  type: MYSTERY_CARD_TYPE;
  shuffleable: boolean;
}

export interface ITreasureMysteryCardRenderData extends IMysteryCardRenderData {
  uses: number;
}
