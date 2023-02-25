import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class Otters extends EventCard implements IEventCard {
  protected readonly _namePL = "wydry";
  protected readonly _resolutionPL = "udane polowanie";

  constructor(game: IGame) {
    super(
      EVENT_CARD.OTTERS,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: null,
        construction: {
          type: CONSTRUCTION.WEAPON,
          lvl: 1,
        },
        resource: null,
      },
      game
    );
  }

  triggerEventEffect() {
    this._game.tileService.markClosestResourceForDepletion("food");
    if (this._game.tileService.countMarkedResourceForDepletion() === 0) {
      this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
    } else {
      this._game.tileService.resourceAmountToDeplete = 1;
    }
  }

  triggerThreatEffect() {}

  fullFill() {
    //TODO: reverse resources's depletion
  }
}
