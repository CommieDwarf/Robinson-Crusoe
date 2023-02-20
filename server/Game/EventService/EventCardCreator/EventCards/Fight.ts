import { EventCard } from "../EventCard";
import { IEventCard } from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { ACTION } from "../../../../../interfaces/ACTION";

export class Fight extends EventCard implements IEventCard {
  protected readonly _namePL = "bójka";
  protected readonly _resolutionPL = "przemowa";

  constructor(game: IGame) {
    super(
      EVENT_CARD.FIGHT,
      ACTION.BUILD,
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
    this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
  }

  triggerThreatEffect() {
    this._game.characterService.decrDeterminationAllPlayerCharacters(
      2,
      this._namePL
    );
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
