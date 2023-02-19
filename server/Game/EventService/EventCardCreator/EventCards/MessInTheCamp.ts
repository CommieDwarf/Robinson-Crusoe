import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class MessInTheCamp extends EventCard implements IEventCard {
  protected readonly _namePL = "bałagan w obozie";
  protected readonly _resolutionPL = "porządkowanie dobytku";

  constructor(game: IGame) {
    super(
      EVENT_CARD.MESS_IN_THE_CAMP,
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
    //TODO: put +1 required helper on arrange camp
  }

  triggerThreatEffect() {
    this._game.characterService.decrDeterminationAllPlayerCharacters(
      1,
      this._namePL
    );
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
