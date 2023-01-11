import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";
import { Resources } from "../../../ResourceService/Resources";
import { ACTION } from "../../../../../interfaces/ACTION";

export class HighWater extends EventCard implements IEventCard {
  protected readonly _namePL = "rwąca rzeka";
  protected readonly _resolutionPL = "odpływ";

  constructor(game: IGame) {
    super(
      EVENT_CARD.HIGH_WATER,
      ACTION.GATHER,
      {
        pawns: 1,
        invention: INVENTION_STARTER.SHOVEL,
        construction: null,
        resource: new Resources(0, 0, 1, 0),
      },
      game
    );
  }

  //TODO: implement if shovel is built, no wood required.

  triggerEffect() {
    //TODO: set exploration question mark.
  }

  triggerThreatEffect() {
    //TODO: check rules in the guide.
  }

  fullFill() {
    this.incrDetermination(2);
  }
}
