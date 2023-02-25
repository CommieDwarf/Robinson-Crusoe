import {
  IMysteryCard,
  ITreasureMysteryCard,
} from "../../../interfaces/MysteryService/MysteryCard";
import { MysteryCardCreator } from "./MysteryCardCreator/MysteryCardCreator";
import { IGame } from "../../../interfaces/Game";
import shuffle from "../../../utils/shuffleArray";
import { IMysteryService } from "../../../interfaces/MysteryService/MysteryService";
import { IMysteryCardDrawer } from "../../../interfaces/MysteryService/MysteryCardDrawer";
import { MysteryCardDrawer } from "./MysteryCardDrawer";
import { ICharacter } from "../../../interfaces/Characters/Character";

export class MysteryService implements IMysteryService {
  private readonly _game: IGame;
  private readonly _ownedTreasureCards: ITreasureMysteryCard[] = [];
  private _cardStack: IMysteryCard[];
  private _cardDrawer: null | IMysteryCardDrawer = null;
  private _currentResolve: null | IMysteryCard = null;

  constructor(game: IGame) {
    this._game = game;
    this._cardStack = this.initCards();
  }

  get renderData() {
    return {
      isDrawingOn: this.isDrawingOn,
      canDraw: this._cardDrawer?.canDraw || false,
      currentResolve: this._currentResolve?.renderData || null,
      canFinish: this._cardDrawer?.canFinish || false,
      drawer: this._cardDrawer?.drawer.renderData || null,
      cardsLeft: {
        creature: this._cardDrawer?.creature || 0,
        trap: this._cardDrawer?.trap || 0,
        treasure: this._cardDrawer?.treasure || 0,
      },
    };
  }

  get isDrawingOn(): boolean {
    return Boolean(this._cardDrawer);
  }

  get ownedTreasureCards(): ITreasureMysteryCard[] {
    return this._ownedTreasureCards;
  }

  get cardStack(): IMysteryCard[] {
    return this._cardStack;
  }

  addTreasureCardToOwned(card: ITreasureMysteryCard) {
    this._ownedTreasureCards.push(card);
  }

  private initCards() {
    const creator = new MysteryCardCreator(this._game);
    return creator.createAllMysteryCards();
  }

  public shuffleBackIntoStack(cards: IMysteryCard[]) {
    this._cardStack = shuffle(this._cardStack.concat(cards));
  }

  public startDrawingCards(
    creature: number,
    trap: number,
    treasure: number,
    drawer: ICharacter
  ) {
    this._cardDrawer = new MysteryCardDrawer(
      this,
      creature,
      trap,
      treasure,
      drawer
    );
  }

  public drawCard() {
    if (!this._cardDrawer) {
      throw new Error("card drawer isn't instanced");
    }
    if (!this._cardDrawer.finished) {
      const card = this._cardDrawer.drawCard();
      this._currentResolve = card;
      card.triggerDrawEffect(this._cardDrawer.drawer);
    }
  }

  public finish() {
    if (!this._cardDrawer) {
      throw new Error("card drawer isn't instanced");
    }
    if (this._cardDrawer.canFinish) {
      this._cardDrawer.finish();
      this._cardDrawer = null;
    }
  }
}
