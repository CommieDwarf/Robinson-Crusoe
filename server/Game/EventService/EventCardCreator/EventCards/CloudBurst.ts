import { EventCard } from "../EventCard";
import { IEventCard } from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { ACTION } from "../../../../../interfaces/ACTION";

export class CloudBurst extends EventCard implements IEventCard {
  protected readonly _namePL = "oberwane chmury";
  protected readonly _resolutionPL = "przeprowadzka";

  constructor(game: IGame) {
    super(
      EVENT_CARD.CLOUDBURST,
      ACTION.GATHER,
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
