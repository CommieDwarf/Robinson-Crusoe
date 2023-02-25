import { EventCard } from "../EventCard";
import { IEventCard } from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { Resources } from "../../../ResourceService/Resources";
import { ACTION } from "../../../../../interfaces/ACTION";

export class Disaster extends EventCard implements IEventCard {
  protected readonly _namePL = "katastrofa";
  protected readonly _resolutionPL = "łata";

  constructor(game: IGame) {
    super(
      EVENT_CARD.DISASTER,
      ACTION.GATHER,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: new Resources(0, 0, 1, 0),
      },
      game
    );
  }

  triggerEventEffect() {
    //TODO: choose -1 roof or -1 palisade
  }

  triggerThreatEffect() {
    //TODO -1/2 roof or palisade
  }

  fullFill() {
    //TODO choose +1 roof or palisade (if shelter is built)
  }
}
