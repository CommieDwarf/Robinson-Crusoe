import { EventCard } from "../EventCard";
import {
  EVENT_TYPE,
  IEventCard,
} from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";

export class NightHowling extends EventCard implements IEventCard {
  protected readonly _namePL = "nocne wycie z dżungli";
  protected readonly _resolutionPL = "ochrona przed bestiami";

  constructor(game: IGame) {
    super(
      EVENT_CARD.NIGHT_HOWLING,
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
    this._game.beastService.beastStrengthEnchanted = true;
  }

  triggerThreatEffect() {
    this._game.constructionService.lvlDownOrSuffer(
      CONSTRUCTION.PALISADE,
      1,
      this.name
    );
  }

  fullFill() {
    const leader = this.getLeaderCharacter();
    this._game.characterService.incrDetermination(leader, 1, this.name);
  }
}
