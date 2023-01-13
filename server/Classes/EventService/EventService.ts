import { IEventCard } from "../../../interfaces/EventService/EventCard";
import {
  IEventService,
  IEventServiceRenderData,
  ThreatSpecialEffects,
} from "../../../interfaces/EventService/EventService";
import { IGame } from "../../../interfaces/Game";
import { EventCardCreator } from "./EventCardCreator/EventCardCreator";
import { EVENT_CARD } from "../../../interfaces/EventService/EVENT_CARD";

interface EventSlots {
  left: null | IEventCard;
  right: null | IEventCard;
}

export class EventService implements IEventService {
  private _eventCards: IEventCard[];

  private readonly _game: IGame;
  private _eventSlots: EventSlots = {
    left: null,
    right: null,
  };

  private _specialEffects: ThreatSpecialEffects = {
    argument: false,
  };

  constructor(game: IGame) {
    this._game = game;
    this._eventCards = this.initEventCards();
    // this.testEventCards(Play);
  }

  get renderData(): IEventServiceRenderData {
    const leftSlot = this.leftSlot ? this.leftSlot.renderData : null;
    const rightSlot = this.rightSlot ? this.rightSlot.renderData : null;
    return {
      leftSlot,
      rightSlot,
    };
  }

  get specialEffects(): ThreatSpecialEffects {
    return this._specialEffects;
  }

  set leftSlot(card: IEventCard | null) {
    this._eventSlots.left = card;
  }

  set rightSlot(card: IEventCard | null) {
    this._eventSlots.right = card;
  }

  get leftSlot() {
    return this._eventSlots.left;
  }

  get rightSlot() {
    return this._eventSlots.right;
  }

  public getCardSlotByDroppableId(droppableId: string) {
    let card;
    if (droppableId.includes("left")) {
      card = this._eventSlots.left;
    } else if (droppableId.includes("right")) {
      card = this._eventSlots.right;
    }
    if (card) {
      return card;
    }
    throw new Error("Couldnt find card in slot with droppable: " + droppableId);
  }

  public fullFill(id: string) {
    this._eventSlots[this.getSlotByCardID(id)]?.fullFill();
  }

  private setInitialCard(eventCards: IEventCard[]) {
    const wreckage = eventCards.shift();
    if (!wreckage) {
      throw new Error("eventCards are empty");
    }
    this._eventSlots.right = wreckage;
  }

  public pullCard() {
    let card = this._eventCards.pop();
    if (!card) {
      throw new Error("There is no card to pull");
    }
    this._eventSlots.right = card;
    card.triggerEffect();
    card.setAdventureToken();
  }

  public moveCardsLeft() {
    this.leftSlot?.triggerThreatEffect();
    this.leftSlot = null;

    this.leftSlot = this.rightSlot;
    this.rightSlot = null;
  }

  public addCardToTopOfStack(card: unknown) {}

  public shuffleCardInToStack(card: unknown) {}

  public switchCardFromTopToBottomOfStack() {}

  public getSlotByCardID(cardID: string) {
    if (this.leftSlot?.id === cardID) {
      return "left";
    } else if (this.rightSlot?.id === cardID) {
      return "right";
    }

    throw new Error("There is no card with id: " + cardID + "in any slot");
  }

  public setSpecialEffect(
    effect: keyof ThreatSpecialEffects,
    value: boolean,
    logSource: string
  ) {
    this._specialEffects[effect] = value;
    if (effect === "argument") {
      const color = value ? "red" : "green";
      const msg = value
        ? "przy zagrożeniu muszą być użyte pionki 2 innych postaci"
        : 'przy zagrożeniu nie muszą już być użyte pionki 2 innych postaci"';
      this._game.chatLog.addMessage(msg, color, logSource);
    }
  }

  private initEventCards(): IEventCard[] {
    const creator = new EventCardCreator(this._game);
    const cards = Object.values(EVENT_CARD).map((card) => creator.create(card));
    return [...cards];
  }

  public testEventCards(game: IGame) {
    this._eventCards.forEach((event, i) => {});

    const char = game.characterService.getCharacter("cook");

    this._eventCards.forEach((card) => {
      this._eventSlots.left = card;
      card.triggerThreatEffect();
      card.triggerEffect();
      card.fullFill();
    });
  }
}
