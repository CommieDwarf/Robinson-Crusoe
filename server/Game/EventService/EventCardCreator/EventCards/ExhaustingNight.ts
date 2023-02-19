import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class ExhaustingNight extends EventCard implements IEventCard {
  protected readonly _namePL = "wyczerpująca noc";
  protected readonly _resolutionPL = "odpoczynek";

  constructor(game: IGame) {
    super(
      EVENT_CARD.EXHAUSTING_NIGHT,
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
    //TODO: put reroll token on build action.
  }

  triggerThreatEffect() {
    this._game.moraleService.lvlDown(2, this._namePL);
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
