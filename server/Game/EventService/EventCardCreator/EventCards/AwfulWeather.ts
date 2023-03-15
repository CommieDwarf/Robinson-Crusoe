import { EventCard } from "../EventCard";
import { IEventCard } from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { BasicResources } from "../../../ResourceService/BasicResources";
import { ACTION } from "../../../../../interfaces/ACTION";

export class AwfulWeather extends EventCard implements IEventCard {
  _namePL = "okropna pogoda";
  _resolutionPL = "wiatrochron";

  constructor(game: IGame) {
    super(
      EVENT_CARD.AWFUL_WEATHER,
      ACTION.EXPLORE,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: new BasicResources(0, 0, 1, 0),
      },
      game
    );
  }

  triggerEventEffect() {
    this._game.weatherService.tokens.rain = true;
  }

  triggerThreatEffect() {
    this._game.weatherService.tokens.snow = true;
  }

  fullFill() {
    const character = this.getLeaderCharacter();
    this._game.characterService.incrDetermination(
      character,
      1,
      `${this.name} (${character.name})`
    );
  }
}
