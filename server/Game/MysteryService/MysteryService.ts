import { IMysteryCard } from "../../../interfaces/MysteryService/MysteryCard";
import { MysteryCardCreator } from "./MysteryCardCreator/MysteryCardCreator";
import { IGame } from "../../../interfaces/Game";
import shuffle from "../../../utils/shuffleArray";
import { IMysteryService } from "../../../interfaces/MysteryService/MysteryService";
import { IMysteryCardDrawer } from "../../../interfaces/MysteryService/MysteryCardDrawer";
import { MysteryCardDrawer } from "./MysteryCardDrawer";
import { IPlayerCharacter } from "../../../interfaces/Characters/Character";

export class MysteryService implements IMysteryService {
  private readonly _game: IGame;
  private _cardsAsReminders: IMysteryCard[] = [];
  private _cardStack: IMysteryCard[];
  private _cardDrawer: null | IMysteryCardDrawer = null;
  private _currentResolve: null | IMysteryCard = null;
  private _currentCardThatRequiresTarget: null | IMysteryCard = null;

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
      cardsAsReminders: this._cardsAsReminders,
    };
  }

  get currentCardThatRequiresTarget(): IMysteryCard | null {
    return this._currentCardThatRequiresTarget;
  }

  set currentCardThatRequiresTarget(value: IMysteryCard | null) {
    this._currentCardThatRequiresTarget = value;
  }

  get isDrawingOn(): boolean {
    return Boolean(this._cardDrawer);
  }

  get cardsAsReminders(): IMysteryCard[] {
    return this._cardsAsReminders;
  }

  get cardStack(): IMysteryCard[] {
    return this._cardStack;
  }

  getCard(cardName: string) {
    let card =
      this._game.resourceService.owned.treasures.find(
        (card) => card.name === cardName
      ) || this._cardsAsReminders.find((card) => card.name === cardName);
    if (!card) {
      throw new Error("Can't find card with given name: " + cardName);
    }
    return card;
  }

  startTargeting() {}

  useCard(user: IPlayerCharacter, cardName: string, target1?: any, target2?: any) {
    const card = this.getCard(cardName);
    if (card.requiresTarget && this._currentCardThatRequiresTarget !== card) {
      this._currentCardThatRequiresTarget = card;
    } else {
      card.use(user, target1, target2);
    }
  }

  public addTreasureToFutureResources(card: IMysteryCard) {
    this._game.resourceService.addTreasureToFuture(card);
  }

  public addTreasureToOwnedResources(card: IMysteryCard) {
    this._game.resourceService.addTreasureToOwned(card);
  }

  addCardAsReminder(card: IMysteryCard) {
    this._cardsAsReminders.push(card);
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
    drawer: IPlayerCharacter,
    max: number = Infinity,
  ) {
    this._cardDrawer = new MysteryCardDrawer(
      this,
      creature,
      trap,
      treasure,
      drawer,
      max
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
