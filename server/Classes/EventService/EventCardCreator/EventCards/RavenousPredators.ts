import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class RavenousPredators extends EventCard implements IEventCard {
  protected readonly _namePL = "wygłodniałe drapieżniki";
  protected readonly _resolutionPL = "przeganianie zwierząt";

  constructor(game: IGame) {
    super(
      EVENT_CARD.RAVENOUS_PREDATORS,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: INVENTION_STARTER.FIRE,
        construction: null,
        resource: null,
      },
      game
    );
  }

  triggerEffect() {
    //TODO: set beast strength +1.
  }

  triggerThreatEffect() {
    this._game.constructionService.lvlDownOrSuffer(
      CONSTRUCTION.PALISADE,
      1,
      this._namePL
    );
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
