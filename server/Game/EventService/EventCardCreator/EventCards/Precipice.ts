import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";
import { Resources } from "../../../ResourceService/Resources";
import { ACTION } from "../../../../../interfaces/ACTION";

export class Precipice extends EventCard implements IEventCard {
  protected readonly _namePL = "przepaść";
  protected readonly _resolutionPL = "budowa mostu";

  constructor(game: IGame) {
    super(
      EVENT_CARD.PRECIPICE,
      ACTION.EXPLORE,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: new Resources(0, 0, 2, 0),
      },
      game
    );
  }

  triggerEffect() {
    //TODO: if possible make tile next to camp unavailable
  }

  triggerThreatEffect() {
    //tile stays unavailable
  }

  fullFill() {
    //TODO: tile becomes available.
    this.incrDetermination(3);
  }
}
