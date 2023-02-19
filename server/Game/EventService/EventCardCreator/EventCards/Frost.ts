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

export class Frost extends EventCard implements IEventCard {
  protected readonly _namePL = "frost";
  protected readonly _resolutionPL = "ogrzanie obozu";

  constructor(game: IGame) {
    super(
      EVENT_CARD.FROST,
      ACTION.GATHER,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: new Resources(0, 0, 1, 1),
      },
      game
    );
  }

  triggerEffect() {
    this._game.weatherService.setToken("snow", true, this._namePL);
  }

  triggerThreatEffect() {
    this.triggerEffect();
  }

  fullFill() {
    this.incrDetermination(2);
  }
}
