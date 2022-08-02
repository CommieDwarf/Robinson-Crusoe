import { IEventCard } from "../../../interfaces/Threat/EventCard";
import { IThreat } from "../../../interfaces/Threat/Threat";

interface threatSlots {
  left: null | IEventCard;
  right: null | IEventCard;
}

export class Threat implements IThreat {
  private _threatSlots: threatSlots = {
    left: null,
    right: null,
  };
  private readonly _game: unknown;

  constructor(game: unknown) {
    this._game = game;
  }

  set leftSlot(card: IEventCard | null) {
    this._threatSlots.left = card;
  }

  set rightSlot(card: IEventCard | null) {
    this._threatSlots.right = card;
  }

  get leftSlot() {
    return this._threatSlots.left;
  }

  get rightSlot() {
    return this._threatSlots.right;
  }

  moveCardsLeft() {
    this.leftSlot?.triggerThreatEffect(this._game);
    this.leftSlot = null;

    this.leftSlot = this.rightSlot;
    this.rightSlot = null;
  }
}
