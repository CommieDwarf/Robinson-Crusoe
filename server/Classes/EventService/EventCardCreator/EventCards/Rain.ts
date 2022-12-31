import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";

export class Rain extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "rain",
      EVENT_TYPE.GATHER,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: {
          wood: 0,
          leather: 1,
          dryFood: 0,
          food: 0,
        },
      },
      game
    );
  }

  triggerEffect() {
    this._game.weatherService.tokens.rain = true;
  }

  triggerThreatEffect() {
    this._game.weatherService.tokens.rain = true;
  }

  fullFill() {
    const leader = this.getLeaderPawn().character;
    this._game.characterService.incrDetermination(leader, 1, this.name);
  }
}



