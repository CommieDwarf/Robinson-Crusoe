import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class BrokenTree extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "broken tree",
      EVENT_TYPE.BUILD,
      {
        pawns: 1,
        invention: INVENTION_STARTER.ROPE,
        construction: null,
        resource: null,
      },
      game
    );
  }

  triggerEffect() {
    this._game.characterService.hurtAllPlayerCharacters(1, this.name);
  }

  triggerThreatEffect() {
    this._game.moraleService.lvlDown(1, this.name);
  }

  fullFill() {
    const leader = this.getLeaderPawn().character;
    this._game.characterService.incrDetermination(leader, 1, this.name);
    this._game.resourceService.addResourceToOwned("wood", 1, this.name);
  }
}
