import { IEventCard, IEventCardRenderData } from "./EventCard";
import { ICharacter } from "../Characters/Character";

export interface IThreatRenderData {
  leftSlot: IEventCardRenderData | null;
  rightSlot: IEventCardRenderData | null;
}

export interface EventAssignedCharacters {
  left1: null | ICharacter;
  left2: null | ICharacter;
  right1: null | ICharacter;
  right2: null | ICharacter;
}

export interface ThreatSpecialEffects {
  argument: boolean;
}

export interface IThreat {
  leftSlot: IEventCard | null;
  rightSlot: IEventCard | null;
  moveCardsLeft: () => void;
  renderData: IThreatRenderData;
  assignedCharacters: EventAssignedCharacters;
  getAssignedCharByCardName: (name: string) => ICharacter;
  specialEffects: ThreatSpecialEffects;
  addCardToTopOfStack: (card: unknown) => void;
  shuffleCardInToStack: (card: unknown) => void;
  switchCardFromTopToBottomOfStack: () => void;
  pullCard: () => void;
  setSpecialEffect: (
    effect: keyof ThreatSpecialEffects,
    value: boolean,
    logSource: string
  ) => void;
}
