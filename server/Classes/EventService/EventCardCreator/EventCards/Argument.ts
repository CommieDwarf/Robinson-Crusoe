import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";

export class Argument extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "argument",
      EVENT_TYPE.BOOK,
      {
        pawns: 2,
        invention: null,
        construction: null,
        resource: null,
      },
      game
    );
  }

  triggerEffect() {
    this._game.eventService.setSpecialEffect("argument", true, this.name);
  }

  triggerThreatEffect() {
    this._game.characterService.decrDeterminationAllPlayerCharacters(
      1,
      this.name
    );
    this._game.moraleService.lvlDown(1, this.name);
  }

  fullFill() {
    const leader = this.getLeaderPawn().character;

    this._game.moraleService.lvlUp(1, this.name);
    this._game.characterService.incrDetermination(leader, 1, this.name);
  }
}
