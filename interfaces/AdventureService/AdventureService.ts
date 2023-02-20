import { AdventureAction } from "../ACTION";
import { IAdventureCard, IAdventureCardRenderData } from "./AdventureCard";

export type AdventureCardStacks = {
  [key in AdventureAction]: IAdventureCard[];
};

export interface IAdventureService {
  setCurrentCard: (actionType: AdventureAction) => void;
  unsetCurrentCard: () => void;
  currentCard: IAdventureCard | null;
  resolveAdventureCard: (option: 1 | 2) => void;

  renderData: IAdventureServiceRenderData;
}

export interface IAdventureServiceRenderData {
  currentCard: IAdventureCardRenderData | null;
}
