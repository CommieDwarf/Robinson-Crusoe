import { IEventCard, IEventCardRenderData } from "./EventCard";
import { IAdventureCard, IAdventureCardRenderData } from "../AdventureService/AdventureCard";

export interface IEventServiceRenderData {
  leftSlot: IEventCardRenderData | null;
  rightSlot: IEventCardRenderData | null;
  currentAdventureCard: IAdventureCardRenderData | null;
}

export interface ThreatSpecialEffects {
  argument: boolean;
}

export interface IEventService {
  leftSlot: IEventCard | null;
  rightSlot: IEventCard | null;
  currentAdventureCard: IAdventureCard | null;
  adventureNeedsToBeResolved: boolean;
  renderData: IEventServiceRenderData;
  specialEffects: ThreatSpecialEffects;

  addCardToTopOfStack: (card: unknown) => void;
  shuffleCardInToDeck: (card: IAdventureCard) => void;
  switchCardFromTopToBottomOfStack: () => void;
  pullCard: () => void;
  setSpecialEffect: (
    effect: keyof ThreatSpecialEffects,
    value: boolean,
    logSource: string
  ) => void;
  fullFill: (cardID: string) => void;
  resolveEventAdventure: (option: 1 | 2) => void;
  getSlotByCardID: (cardID: string) => "left" | "right";
  getCardSlotByDroppableId: (droppableId: string) => IEventCard;
}
