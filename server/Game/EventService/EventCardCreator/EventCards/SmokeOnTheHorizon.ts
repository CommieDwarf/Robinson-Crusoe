import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";

export class SmokeOnTheHorizon extends EventCard implements IEventCard {
  protected readonly _namePL = "dym na horyzoncie";
  protected readonly _resolutionPL = "gaszenie ognia";

  constructor(game: IGame) {
    super(
      EVENT_CARD.SMOKE_ON_THE_HORIZON,
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

  triggerEffect() {
    //TODO: if possible cover plains
  }

  triggerThreatEffect() {
    this.triggerEffect();
  }

  fullFill() {
    //TODO: uncover plains
    this.incrDetermination(1);
  }
}
