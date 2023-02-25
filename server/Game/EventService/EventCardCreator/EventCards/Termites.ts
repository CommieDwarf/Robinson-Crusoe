import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class Termites extends EventCard implements IEventCard {
  protected readonly _namePL = "insekty";
  protected readonly _resolutionPL = "walka ze szkodnikami";

  constructor(game: IGame) {
    super(
      EVENT_CARD.TERMITES,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: INVENTION_STARTER.FIRE,
        construction: null,
        resource: null,
      },
      game
    );
  }

  triggerEventEffect() {
    this._game.resourceService.spendResourceIfPossible("wood", 1, this._namePL);
  }

  triggerThreatEffect() {
    this.triggerEventEffect();
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
