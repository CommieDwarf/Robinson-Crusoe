import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";

export class Vertigo extends EventCard implements IEventCard {
  protected readonly _namePL = "zawroty głowy";
  protected readonly _resolutionPL = "odpoczynek";

  constructor(game: IGame) {
    super(
      EVENT_CARD.VERTIGO,
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
    //TODO: prime player can use only 1 pawn
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
