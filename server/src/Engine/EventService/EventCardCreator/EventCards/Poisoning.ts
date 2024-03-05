import {EventCard} from "../EventCard";
import {EVENT_TYPE, IEventCard,} from "../../../../types/EventService/EventCard";
import {IGame} from "../../../../types/Game";
import {EVENT_CARD} from "../../../../types/EventService/EVENT_CARD";
import {INVENTION_STARTER} from "../../../../types/InventionService/Invention";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";

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
        resource: null, optionalResource: null,
      },
      game
    );
  }

  triggerEventEffect() {
    this._game.characterService.hurtAllPlayerCharacters(1, this._namePL);
  }

  triggerThreatEffect() {
    this.triggerEventEffect();
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
