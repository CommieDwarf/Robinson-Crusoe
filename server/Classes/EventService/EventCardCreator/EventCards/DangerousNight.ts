import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class DangerousNight extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "dangerous night",
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: null,
        construction: {
          type: CONSTRUCTION.WEAPON,
          lvl: 2,
        },
        resource: null,
      },
      game
    );
  }

  triggerEffect() {
    // TODO: implement adding beast to event cards.
    this._game.eventService.addCardToTopOfStack(undefined);
  }

  triggerThreatEffect() {
    // nothing happens.
  }

  fullFill() {
    // TODO: shuffle beast in to the event cards.
  }
}
