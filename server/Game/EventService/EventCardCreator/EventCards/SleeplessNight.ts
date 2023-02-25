import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";

export class SleeplessNight extends EventCard implements IEventCard {
  protected readonly _namePL = "bezsenna noc";
  protected readonly _resolutionPL = "odpoczynek";

  constructor(game: IGame) {
    super(
      EVENT_CARD.SLEEPLESS_NIGHT,
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

  triggerEventEffect() {
    //TODO: implement
  }

  triggerThreatEffect() {
    //TODO: implement token.
    // this._game.actionService.eventToken = true;
    // this._game.actionService.specificActionServices.gather.eventToken = true;
  }

  fullFill() {
    this._game.characterService.incrDetermination(
      this.getLeaderCharacter(),
      1,
      this.name
    );
  }
}
