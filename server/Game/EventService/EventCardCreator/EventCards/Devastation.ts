import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class Devastation extends EventCard implements IEventCard {
  protected readonly _namePL = "niszczycielskie podmuchy";
  protected readonly _resolutionPL = "nowe ścieżki";

  constructor(game: IGame) {
    super(
      EVENT_CARD.DEVASTATION,
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

  triggerEventEffect() {
    //TODO: deplete 2 chosen resources around camp.
  }

  triggerThreatEffect() {
    //TODO: deplete 1 chosen resource around camp.
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
