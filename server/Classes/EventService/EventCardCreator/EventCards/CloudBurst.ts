import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";

export class CloudBurst extends EventCard implements IEventCard {
  constructor(game: IGame) {
    super(
      "it will rain",
      EVENT_TYPE.GATHER,
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
    if (this._game.tileService.canCampBeMoved()) {
      this._game.tileService.forceCampMovement();
    } else {
      this._game.characterService.hurtAllPlayerCharacters(1, this.name);
    }
  }

  triggerThreatEffect() {
    // nothing happens.
  }

  fullFill() {
    const previousCampTile = this._game.tileService.previousCampTile;
    if (previousCampTile) {
      if (previousCampTile.builtStructures.roof > 0) {
        this._game.tileService.campTile.incrementStructureLvl("roof", 1);
      }
      if (previousCampTile.builtStructures.shelter > 0) {
        this._game.tileService.campTile.incrementStructureLvl("palisade", 1);
      }
    }
  }
}
