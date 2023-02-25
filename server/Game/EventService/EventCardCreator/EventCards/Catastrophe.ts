import { EventCard } from "../EventCard";
import { IEventCard } from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { ACTION } from "../../../../../interfaces/ACTION";

export class Catastrophe extends EventCard implements IEventCard {
  protected _namePL = "kataklizm";
  protected _resolutionPL = "naprawa narzędzi";

  constructor(game: IGame) {
    super(
      EVENT_CARD.BEAR,
      ACTION.BUILD,
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
    //TODO: lock equipment items from usage.
    //TODO: unlock after action phase.
  }

  triggerThreatEffect() {
    //TODO: discard 1 equipment item and cancel it's effect if possible
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
