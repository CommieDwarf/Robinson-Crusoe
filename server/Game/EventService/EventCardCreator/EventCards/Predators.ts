import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";
import { ACTION } from "../../../../../interfaces/ACTION";

export class Predators extends EventCard implements IEventCard {
  protected readonly _namePL = "drapieżniki";
  protected readonly _resolutionPL = "walka z drapieżnikami";

  constructor(game: IGame) {
    super(
      EVENT_CARD.PREDATORS,
      ACTION.EXPLORE,
      {
        pawns: 2,
        invention: null,
        construction: {
          type: CONSTRUCTION.WEAPON,
          lvl: 2,
        },
        resource: null,
      },
      game
    );
  }

  triggerEffect() {
    //TODO: deplete closest food source or all players get hurt.
  }

  triggerThreatEffect() {
    this.triggerEffect();
  }

  fullFill() {
    this.incrDetermination(1);
    //TODO: reverse resource depletion.
  }
}
