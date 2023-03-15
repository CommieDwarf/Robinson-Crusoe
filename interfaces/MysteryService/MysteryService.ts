import { IMysteryCard, IMysteryCardRenderData } from "./MysteryCard";
import { ICharacter, ICharacterRenderData } from "../Characters/Character";

export interface IMysteryService {
  cardsAsReminders: IMysteryCard[];
  cardStack: IMysteryCard[];
  shuffleBackIntoStack: (cards: IMysteryCard[]) => void;
  isDrawingOn: boolean;

  startDrawingCards: (
    creature: number,
    trap: number,
    treasure: number,
    drawer: ICharacter
  ) => void;
  addCardAsReminder: (card: IMysteryCard) => void;
  addTreasureToFutureResources: (card: IMysteryCard) => void;
  addTreasureToOwnedResources: (card: IMysteryCard) => void;

  drawCard: () => void;
  finish: () => void;

  renderData: IMysteryServiceRenderData;
}

export interface MysteryCardsAmount {
  creature: number;
  trap: number;
  treasure: number;
}

export interface IMysteryServiceRenderData {
  isDrawingOn: boolean;
  canDraw: boolean;
  currentResolve: IMysteryCardRenderData | null;
  canFinish: boolean;
  drawer: ICharacterRenderData | null;
  cardsLeft: MysteryCardsAmount;
  cardsAsReminders: IMysteryCard[];
}
