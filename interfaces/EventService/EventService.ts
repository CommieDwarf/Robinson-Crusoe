import { IEventCard, IEventCardRenderData } from "./EventCard";
import { ICharacter } from "../Characters/Character";

export interface IEventServiceRenderData {
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

export interface IEventService {
  leftSlot: IEventCard | null;
  rightSlot: IEventCard | null;
  renderData: IEventServiceRenderData;
  specialEffects: ThreatSpecialEffects;

  addCardToTopOfStack: (card: unknown) => void;
  shuffleCardInToStack: (card: unknown) => void;
  switchCardFromTopToBottomOfStack: () => void;
  moveCardsLeft: () => void;
  pullCard: () => void;
  setSpecialEffect: (
    effect: keyof ThreatSpecialEffects,
    value: boolean,
    logSource: string
  ) => void;
  fullFill: (cardID: string) => void;
  getSlotByCardID: (cardID: string) => "left" | "right";
  getCardSlotByDroppableId: (droppableId: string) => IEventCard;
}
