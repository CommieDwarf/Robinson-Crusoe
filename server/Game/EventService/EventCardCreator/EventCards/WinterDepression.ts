import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { Resources } from "../../../ResourceService/Resources";

export class WinterDepression extends EventCard implements IEventCard {
  protected readonly _namePL = "zimowa depresja";
  protected readonly _resolutionPL = "rozgrzanie";

  constructor(game: IGame) {
    super(
      EVENT_CARD.WINTER_DEPRESSION,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: new Resources(1, 0, 0, 0),
      },
      game
    );
  }

  triggerEffect() {
    this._game.moraleService.lvlDown(1, this._name);
  }

  triggerThreatEffect() {
    this._game.characterService.decrDeterminationAllPlayerCharacters(
      1,
      this._namePL
    );
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
