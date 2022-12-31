import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class RavishingWindstorm extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "ravishing windstorm",
      EVENT_TYPE.EXPLORE,
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
    this._game.constructionService.lvlDownIfPossible(
      CONSTRUCTION.WEAPON,
      1,
      this.name
    );
  }

  triggerThreatEffect() {
    return;
    // nothing happens
  }

  fullFill() {
    const leader = this.getLeaderPawn().character;
    this._game.characterService.incrDetermination(leader, 1, this.name);

    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.WEAPON,
      1,
      this.name
    );
  }
}







