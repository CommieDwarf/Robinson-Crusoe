import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";
import { ACTION } from "../../../../../interfaces/ACTION";

export class Jaguar extends EventCard implements IEventCard {
  protected readonly _namePL = "jaguar";
  protected readonly _resolutionPL = "warta";

  constructor(game: IGame) {
    super(
      EVENT_CARD.JAGUAR,
      ACTION.BUILD,
      {
        pawns: 1,
        invention: null,
        construction: {
          type: CONSTRUCTION.WEAPON,
          lvl: 2,
        },
        resource: null,
      },
      game
    );
  }

  triggerEffect() {
    this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
  }

  triggerThreatEffect() {
    this.triggerEffect();
  }

  fullFill() {
    //nothing
  }
}
