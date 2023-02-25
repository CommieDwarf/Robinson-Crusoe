import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";

export class SlowWork extends EventCard implements IEventCard {
  protected readonly _namePL = "znojna praca";
  protected readonly _resolutionPL = "odpoczynek";

  constructor(game: IGame) {
    super(
      EVENT_CARD.SLOW_WORK,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: null,
      },
      game
    );
  }

  triggerEventEffect() {
    //TODO: put +1 wood on build action
  }

  triggerThreatEffect() {
    this.triggerEventEffect();
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
