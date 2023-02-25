import { EventCard } from "../EventCard";
import { IEventCard } from "../../../../../interfaces/EventService/EventCard";
import { IGame } from "../../../../../interfaces/Game";
import { EVENT_CARD } from "../../../../../interfaces/EventService/EVENT_CARD";
import { CONSTRUCTION } from "../../../../../interfaces/ConstructionService/Construction";
import { ACTION } from "../../../../../interfaces/ACTION";

export class NightAttack extends EventCard implements IEventCard {
  protected readonly _namePL = "nocny atak";
  protected readonly _resolutionPL = "w poszukiwaniu bestii";

  constructor(game: IGame) {
    super(
      EVENT_CARD.NIGHT_ATTACK,
      ACTION.EXPLORE,
      {
        pawns: 1,
        invention: null,
        construction: {
          type: CONSTRUCTION.WEAPON,
          lvl: 3,
        },
        resource: null,
      },
      game
    );
  }

  triggerEventEffect() {
    this._game.characterService.hurtAllPlayerCharacters(1, this._name);
    //TODO: if possible peek beast from hunting deck.
  }

  triggerThreatEffect() {
    if (this._game.beastService.deckCount > 0) {
      this._game.beastService.removeBeastFromDeck();
    }
  }

  fullFill() {
    //TODO: fight beast from deck. ignore it's strength.
  }
}
