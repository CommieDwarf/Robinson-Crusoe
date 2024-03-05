import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../../interfaces/EventService/EVENT_CARD";

export class Weakness extends EventCard implements IEventCard {
  protected readonly _namePL = "osłabienie";
  protected readonly _resolutionPL = "odpoczynek";

  constructor(game: IGame) {
    super(
      EVENT_CARD.WEAKNESS,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: null, optionalResource: null,
      },
      game
    );
  }

  triggerEventEffect() {
    //TODO: prime player cant use abilities
  }

  triggerThreatEffect() {
    this.triggerEventEffect();
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
