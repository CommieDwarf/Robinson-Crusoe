import { EventCard } from "../EventCard";
import { IEventCard } from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";
import { Resources } from "../../../ResourceService/Resources";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";
import { ACTION } from "../../../../../interfaces/ACTION";

export class Storm extends EventCard implements IEventCard {
  protected readonly _namePL = "sztorm";
  protected readonly _resolutionPL = "wzmocnienie obozowiska";

  constructor(game: IGame) {
    super(
      EVENT_CARD.STORM,
      ACTION.GATHER,
      {
        pawns: 1,
        invention: INVENTION_STARTER.SHOVEL,
        construction: null,
        resource: new Resources(0, 0, 1, 0),
      },
      game
    );
  }

  triggerEventEffect() {
    this._game.weatherService.setToken("storm", true, this._namePL);
  }

  triggerThreatEffect() {
    this._game.constructionService.lvlDownOrSuffer(
      CONSTRUCTION.PALISADE,
      1,
      this._namePL
    );
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
