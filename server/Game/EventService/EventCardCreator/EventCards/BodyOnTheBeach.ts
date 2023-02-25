import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class BodyOnTheBeach extends EventCard implements IEventCard {
  protected _namePL = "ciało na plaży";
  protected _resolutionPL = "pochówek";

  constructor(game: IGame) {
    super(
      EVENT_CARD.BODY_ON_THE_BEACH,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: INVENTION_STARTER.SHOVEL,
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
    this._game.moraleService.lvlDown(2, this._namePL);
  }

  fullFill() {
    this._game.characterService.incrDetermination(
      this.getLeaderCharacter(),
      2,
      this._resolutionPL
    );
  }
}
