import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class NightHowling extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "night howling",
      EVENT_TYPE.BOOK,
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
    this._game.beastService.beastStrengthEnchanted = true;
  }

  triggerThreatEffect() {
    this._game.constructionService.lvlDownOrSuffer(
      CONSTRUCTION.PALISADE,
      1,
      this.name
    );
  }

  fullFill() {
    const leader = this.getLeaderPawn().character;
    this._game.characterService.incrDetermination(leader, 1, this.name);
  }
}
