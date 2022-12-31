import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";

export class UnusuallyColdNight extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "unusually cold night",
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: {
          wood: 1,
          leather: 1,
          food: 0,
          dryFood: 0,
        },
      },
      game
    );
  }

  triggerEffect() {
    this._game.resourceService.spendResourceOrGetHurt("wood", 2, this.name);
  }

  triggerThreatEffect() {
    this._game.characterService.hurtAllPlayerCharacters(1, this.name);
  }

  fullFill() {
    this._game.characterService.incrDetermination(
      this.getLeaderPawn().character,
      1,
      this.name
    );
  }
}
