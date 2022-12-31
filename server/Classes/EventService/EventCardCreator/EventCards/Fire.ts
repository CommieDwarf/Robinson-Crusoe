import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class Fire extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "fire",
      EVENT_TYPE.EXPLORE,
      {
        pawns: 1,
        invention: INVENTION_STARTER.SHOVEL,
        construction: null,
        resource: null,
      },
      game
    );
  }

  triggerEffect() {
    this._game.resourceService.blockedProductionRound = this._game.round;
  }

  triggerThreatEffect() {
    this._game.resourceService.blockedProductionRound = this._game.round;
  }

  fullFill() {
    const leader = this.getLeaderPawn().character;
    this._game.characterService.incrDetermination(leader, 2, this.name);
  }
}
