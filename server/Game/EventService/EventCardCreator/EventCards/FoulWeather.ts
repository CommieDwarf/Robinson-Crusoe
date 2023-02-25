import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { INVENTION_STARTER } from "../../../../../interfaces/InventionService/Invention";

export class FoulWeather extends EventCard implements IEventCard {
  protected readonly _namePL = "załamanie pogody";
  protected readonly _resolutionPL = "zabezpieczenie źródeł";

  constructor(game: IGame) {
    super(
      EVENT_CARD.FOUL_WEATHER,
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
    //TODO: put +1 helper on gather action.
  }

  triggerThreatEffect() {
    //TODO: deplete 2 chosen resources around the camp.
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
