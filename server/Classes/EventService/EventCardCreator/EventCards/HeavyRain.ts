import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";
import { Resources } from "../../../ResourceService/Resources";
import { ACTION } from "../../../../../interfaces/ACTION";

export class HeavyRain extends EventCard implements IEventCard {
  protected readonly _namePL = "ulewa";
  protected readonly _resolutionPL = "przygotowanie do ulewy";

  constructor(game: IGame) {
    super(
      EVENT_CARD.HEAVY_RAIN,
      ACTION.BUILD,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: new Resources(0, 0, 1, 0),
      },
      game
    );
  }

  triggerEffect() {
    this._game.weatherService.setToken("rain", true, this._namePL);
  }

  triggerThreatEffect() {
    this.triggerEffect();
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
