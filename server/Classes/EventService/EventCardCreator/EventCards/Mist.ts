import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class Mist extends EventCard implements IEventCard {
  protected readonly _namePL = "mgła";
  protected readonly _resolutionPL = "odszukanie dawnego tropu";

  constructor(game: IGame) {
    super(
      EVENT_CARD.MIST,
      EVENT_TYPE.BOOK,
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
    //TODO: put +1 required helper on explore action
  }

  triggerThreatEffect() {
    this.triggerEffect();
    //TODO put question mark on explore action.
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
