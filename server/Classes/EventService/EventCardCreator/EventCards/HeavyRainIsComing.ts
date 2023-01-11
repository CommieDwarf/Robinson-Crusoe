import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";
import { ACTION } from "../../../../../interfaces/ACTION";

export class HeavyRainIsComing extends EventCard implements IEventCard {
  protected readonly _namePL = "nadchodzi ulewa";
  protected readonly _resolutionPL = "irygacja";

  constructor(game: IGame) {
    super(
      EVENT_CARD.HEAVY_RAIN_IS_COMING,
      ACTION.GATHER,
      {
        pawns: 1,
        invention: INVENTION_STARTER.SHOVEL,
        construction: null,
        resource: null,
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
