import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";
import { Resources } from "../../../ResourceService/Resources";
import { ACTION } from "../../../../../interfaces/ACTION";

export class FlyingSurprise extends EventCard implements IEventCard {
  protected readonly _namePL = "latająca niespodzianka";
  protected readonly _resolutionPL = "sprzątanie po wypadku";

  constructor(game: IGame) {
    super(
      EVENT_CARD.FLYING_SURPRISE,
      ACTION.BUILD,
      {
        pawns: 1,
        invention: null,
        construction: null,
        resource: new Resources(0, 0, 1, 0),
      },
      game
    );
  }

  triggerEffect() {
    //TODO: choose -1 roof or -1 palisade
  }

  triggerThreatEffect() {
    //TODO: same as triggerEffect
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
