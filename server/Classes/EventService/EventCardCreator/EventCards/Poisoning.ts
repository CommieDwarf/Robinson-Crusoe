import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class Poisoning extends EventCard implements IEventCard {
  protected readonly _namePL = "trucizna";
  protected readonly _resolutionPL = "odsączanie trucizny";

  constructor(game: IGame) {
    super(
      EVENT_CARD.POISONING,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: INVENTION_STARTER.KNIFE,
        construction: null,
        resource: null,
      },
      game
    );
  }

  triggerEffect() {
    this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
  }

  triggerThreatEffect() {
    this.triggerEffect();
  }

  fullFill() {
    this.incrDetermination(1);
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.WEAPON,
      1,
      this._resolutionPL
    );
  }
}
