import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { WRECKAGE_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";

export class WreckedLifeboat extends EventCard implements IEventCard {
  protected readonly _namePL = "resztki szalupy";
  protected readonly _resolutionPL = "wyprawa po drewno";

  constructor(game: IGame) {
    super(
      WRECKAGE_CARD.WRECKED_LIFEBOAT,
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
    //nothing
  }

  triggerThreatEffect() {
    //nothing
  }

  fullFill() {
    const helperPawn = this.getHelperPawn();
    if (helperPawn) {
      this._game.resourceService.addResourceToFuture(
        "wood",
        2,
        this.resolutionPL
      );
    } else {
      this._game.resourceService.addResourceToOwned(
        "wood",
        1,
        this.resolutionPL
      );
    }
  }
}
