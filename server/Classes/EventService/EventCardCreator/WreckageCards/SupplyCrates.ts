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

export class SupplyCrates extends EventCard implements IEventCard {
  protected readonly _namePL = "skrzynie z jedzeniem";
  protected readonly _resolutionPL = "wyprawa po jedzenie";

  constructor(game: IGame) {
    super(
      WRECKAGE_CARD.SUPPLY_CRATES,
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
    return;
  }

  triggerThreatEffect() {
    return;
  }

  fullFill() {
    this._game.resourceService.addResourceToOwned("food", 1, this.name);
    const helper = this.getHelperPawn();
    if (helper) {
      this._game.resourceService.addResourceToOwned("dryFood", 1, this.name);
    }
  }
}
