import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class Drought extends EventCard implements IEventCard {
  protected readonly _namePL = "susza";
  protected readonly _resolutionPL = "nowe koryto";

  constructor(game: IGame) {
    super(
      EVENT_CARD.DROUGHT,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: INVENTION_STARTER.SHOVEL,
        construction: null,
        resource: null,
      },
      game
    );
  }

  triggerEffect() {
    //TODO: if possible cover river terrain on some tile.
    //TODO: treat as unexplored terrain.
  }

  triggerThreatEffect() {
    //TODO: same as triggerEffect
  }

  fullFill() {
    //TODO: uncover river
    this.incrDetermination(1);
  }
}
