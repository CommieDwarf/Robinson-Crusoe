import { GatherAdventureCard } from "./GatherAdventureCard/GatherAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_GATHER } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class WinterIsComing
  extends GatherAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "przymrozek";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_GATHER.WINTER_IS_COMING,
      "nadchodzi zima",
      false,
      game
    );
  }

  option1() {
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    this._game.weatherService.setToken("snow", true, this._eventNamePL);
  }
}
