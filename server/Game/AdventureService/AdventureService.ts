import { IGame } from "../../../interfaces/Game";
import { IAdventureCard } from "../../../interfaces/AdventureService/AdventureCard";
import { AdventureAction } from "../../../interfaces/ACTION";
import {
  AdventureCardStacks,
  IAdventureService,
  IAdventureServiceRenderData,
} from "../../../interfaces/AdventureService/AdventureService";
import { AdventureCardCreator } from "./AdventureCardCreator/Creators/AdventureCardCreator";

export class AdventureService implements IAdventureService {
  private readonly _game: IGame;

  private _stacks: AdventureCardStacks = {
    build: [],
    explore: [],
    gather: [],
  };

  private _currentCard: IAdventureCard | null = null;

  constructor(game: IGame) {
    this._game = game;
    this._stacks = this.initCards();
  }

  get renderData(): IAdventureServiceRenderData {
    return {
      currentCard: this._currentCard ? this._currentCard.renderData : null,
    };
  }

  get currentCard(): IAdventureCard | null {
    return this._currentCard;
  }

  resolveAdventureCard(option: 1 | 2) {
    if (!this._currentCard) {
      throw new Error("There is no current card to resolve");
    }
    if (option === 1 || !this._currentCard.shouldDecide) {
      this._currentCard.option1();
    } else {
      this._currentCard.option2();
    }
    this.unsetCurrentCard();
  }

  setCurrentCard(adventureType: AdventureAction) {
    const card = this._stacks[adventureType].pop();
    if (!card) {
      throw new Error(`Card popped from ${adventureType} stack is ${card}`);
    }
    this._currentCard = card;
  }

  unsetCurrentCard() {
    this._currentCard = null;
  }

  private initCards() {
    const adventureCardCreator = new AdventureCardCreator(this._game);
    return adventureCardCreator.createAllCards();
  }
}
