import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import {
  EVENT_CARD,
  WRECKAGE_CARD,
} from "../../../../../interfaces/EventService/EVENT_CARD";

export class CaptainsChest extends EventCard implements IEventCard {
  protected _namePL = "kufer kapitana";
  protected _resolutionPL = "wyprawa po skarby";

  constructor(game: IGame) {
    super(
      WRECKAGE_CARD.CAPTAINS_CHEST,
      EVENT_TYPE.WRECKAGE,
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
    // nothing is happening
  }

  triggerThreatEffect() {
    // nothing
  }

  fullFill() {
    //TODO: implement more space for equipment item before this.
  }
}
