import { EventCard } from "../EventCard";
import { IEventCard } from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { ACTION } from "../../../../../interfaces/ACTION";

export class MemoriesOfTheCruise extends EventCard implements IEventCard {
  protected readonly _namePL = "wspomnienia z rejsu";
  protected readonly _resolutionPL = "szanty";

  constructor(game: IGame) {
    super(
      EVENT_CARD.MEMORIES_OF_THE_CRUISE,
      ACTION.BUILD,
      {
        pawns: 2,
        invention: null,
        construction: null,
        resource: null,
      },
      game
    );
  }

  triggerEventEffect() {
    this._game.moraleService.lvlDown(1, this._namePL);
  }

  triggerThreatEffect() {
    this._game.characterService.decrDeterminationAllPlayerCharacters(
      1,
      this._namePL
    );
  }

  fullFill() {
    this.incrDetermination(2);
    this._game.moraleService.lvlUp(1, this._resolutionPL);
  }
}
