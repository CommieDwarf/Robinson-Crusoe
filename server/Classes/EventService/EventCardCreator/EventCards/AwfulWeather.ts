import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";

export class AwfulWeather extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "awful weather",
      EVENT_TYPE.EXPLORE,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: {
          wood: 1,
          leather: 0,
          food: 0,
          dryFood: 0,
        },
      },
      game
    );
  }

  triggerEffect() {
    this._game.weatherService.tokens.rain = true;
  }

  triggerThreatEffect() {
    this._game.weatherService.tokens.snow = true;
  }

  fullFill() {
    const character = this.getLeaderPawn().character;
    this._game.characterService.incrDetermination(
      character,
      1,
      `${this.name} (${character.name})`
    );
  }
}
