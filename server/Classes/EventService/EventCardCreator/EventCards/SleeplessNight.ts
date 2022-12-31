import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";

export class SleeplessNight extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "sleepless night",
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
    this._game.actionService.specificActionServices.gather.reRollToken = true;
    this._game.actionService.specificActionServices.build.reRollToken = true;
    this._game.actionService.specificActionServices.explore.reRollToken = true;
  }

  triggerThreatEffect() {
    this._game.actionService.specificActionServices.explore.eventToken = true;
    this._game.actionService.specificActionServices.gather.eventToken = true;
  }

  fullFill() {
    this._game.characterService.incrDetermination(
      this.getLeaderPawn().character,
      1,
      this.name
    );
  }
}
