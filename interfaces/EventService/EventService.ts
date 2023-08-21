import { IEventCard, IEventCardRenderData } from "./EventCard";
import { IAdventureCard, IAdventureCardRenderData } from "../AdventureService/AdventureCard";
import { IMysteryCard, IMysteryCardRenderData } from "../MysteryService/MysteryCard";

export interface IEventServiceRenderData {
  leftSlot: IEventCardRenderData | null;
  rightSlot: IEventCardRenderData | null;
  currentAdventureCard: IAdventureCardRenderData | null;
  currentMysteryCard: IMysteryCardRenderData | null;
}

export interface ThreatSpecialEffects {
  argument: boolean;
}

export interface IEventService {
  leftSlot: IEventCard | null;
  rightSlot: IEventCard | null;
  currentAdventureCard: IAdventureCard | null;
  currentMysteryCard: IMysteryCard | null;
  adventureNeedsToBeResolved: boolean;
  renderData: IEventServiceRenderData;
  specialEffects: ThreatSpecialEffects;

  addCardToTopOfStack: (card: unknown) => void;
  shuffleCardInToDeck: (card: IAdventureCard | IMysteryCard) => void;
  switchCardFromTopToBottomOfStack: () => void;
  pullCard: () => void;
  setSpecialEffect: (
    effect: keyof ThreatSpecialEffects,
    value: boolean,
    logSource: string
  ) => void;
  fullFill: (cardID: string) => void;
  resolveEventAdventure: (option: 1 | 2) => void;
  resolveEventMystery: () => void;
  getSlotByCardID: (cardID: string) => "left" | "right";
  getCardSlotByDroppableId: (droppableId: string) => IEventCard;
  canGoNextPhase: () => boolean;
  isEventCardPulledThisRound: () => boolean;
}
