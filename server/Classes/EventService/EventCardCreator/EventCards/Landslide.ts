import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";
import { ACTION } from "../../../../../interfaces/ACTION";

export class Landslide extends EventCard implements IEventCard {
  protected readonly _namePL = "osuwisko";
  protected readonly _resolutionPL = "zabezpieczenie obozowiska";

  constructor(game: IGame) {
    super(
      EVENT_CARD.LANDSLIDE,
      ACTION.BUILD,
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
    //TODO: move camp, check guide
  }

  triggerThreatEffect() {
    //TODO: no resources in production phase.
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
