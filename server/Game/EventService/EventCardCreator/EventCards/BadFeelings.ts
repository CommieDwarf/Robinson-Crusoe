import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";

export class BadFeelings extends EventCard implements IEventCard {
  protected _namePL = "złe przeczucia";
  protected _resolutionPL = "ostrożne zbieranie";

  constructor(game: IGame) {
    super(
      EVENT_CARD.BAD_FEELINGS,
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

  triggerEventEffect() {
    //TODO: put reRoll token on gather action.
  }

  triggerThreatEffect() {
    //TODO: put Reroll and adventure token on gather action.
  }

  fullFill() {
    const leader = this.getLeaderCharacter();
    this._game.characterService.incrDetermination(
      leader,
      1,
      this._resolutionPL
    );
  }
}
