import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class RoughPassage extends EventCard implements IEventCard {
  protected readonly _namePL = "wyboiste przejście";
  protected readonly _resolutionPL = "wytyczanie nowej ścieżki";

  constructor(game: IGame) {
    super(
      EVENT_CARD.ROUGH_PASSAGE,
      EVENT_TYPE.BOOK,
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
    //TODO: if possible cover hills terrain on chosen tile.
  }

  triggerThreatEffect() {
    this.triggerEffect();
  }

  fullFill() {
    //TODO: uncover hills.
    this.incrDetermination(1);
  }
}
