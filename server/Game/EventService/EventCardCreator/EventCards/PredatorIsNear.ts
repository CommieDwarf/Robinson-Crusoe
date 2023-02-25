import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";

export class PredatorIsNear extends EventCard implements IEventCard {
  protected readonly _namePL = "drapieżnik w okolicy";
  protected readonly _resolutionPL = "walka o pożywienie";

  constructor(game: IGame) {
    super(
      EVENT_CARD.PREDATOR_IS_NEAR,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
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

  triggerEventEffect() {
    //TODO: deplete closest food source od all players get hurt
  }

  triggerThreatEffect() {
    //TODO: put explore and gather question marks.
  }

  fullFill() {
    //TODO: reverse depletion.
    this.incrDetermination(1);
  }
}
