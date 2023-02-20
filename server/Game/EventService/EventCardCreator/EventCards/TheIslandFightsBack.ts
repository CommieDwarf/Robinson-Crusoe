import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";

export class TheIslandFightsBack extends EventCard implements IEventCard {
  protected readonly _namePL = "wyspa się buntuje";
  protected readonly _resolutionPL = "ratunek";

  constructor(game: IGame) {
    super(
      EVENT_CARD.THE_ISLAND_FIGHTS_BACK,
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
    //TODO: check guide
  }

  triggerThreatEffect() {
    //TODO: check guide
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
