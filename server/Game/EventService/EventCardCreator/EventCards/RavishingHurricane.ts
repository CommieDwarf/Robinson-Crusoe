import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class RavishingHurricane extends EventCard implements IEventCard {
  protected readonly _namePL = "spustoszenia po huraganie";
  protected readonly _resolutionPL = "odzyskanie źródeł";

  constructor(game: IGame) {
    super(
      EVENT_CARD.RAVISHING_HURRICANE,
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
    //TODO: if possible
    //TODO: deplete resources of border tile.
  }

  triggerThreatEffect() {
    //depletion stays
  }

  fullFill() {
    //TODO: reverse depletion.
    this.incrDetermination(1);
  }
}
