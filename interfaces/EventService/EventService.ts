import { IEventCard, IEventCardRenderData } from "./EventCard";
import { IAdventureCard } from "../AdventureService/AdventureCard";

export interface IEventServiceRenderData {
  leftSlot: IEventCardRenderData | null;
  rightSlot: IEventCardRenderData | null;
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
  shuffleCardInToDeck: (card: IAdventureCard) => void;
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
