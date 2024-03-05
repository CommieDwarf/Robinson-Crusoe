import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../types/InventionService/Invention";

export class Termites extends EventCard implements IEventCard {
  protected readonly _namePL = "insekty";
  protected readonly _resolutionPL = "walka ze szkodnikami";

  constructor(game: IGame) {
    super(
      EVENT_CARD.TERMITES,
      EVENT_TYPE.BOOK,
      {
        pawns: 1,
        invention: INVENTION_STARTER.FIRE,
        construction: null,
        resource: null, optionalResource: null,
      },
      game
    );
  }

  triggerEventEffect() {
    this._game.resourceService.spendBasicResourceIfPossible(
      "wood",
      1,
      this._namePL
    );
  }

  triggerThreatEffect() {
    this.triggerEventEffect();
  }

  fullFill() {
    this.incrDetermination(1);
  }
}
