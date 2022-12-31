import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";

export class SupplyCrates extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "supply crates",
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
