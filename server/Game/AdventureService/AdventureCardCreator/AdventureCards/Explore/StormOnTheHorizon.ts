import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class StormOnTheHorizon
  extends ExploreAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "sztorm";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.STORM_ON_THE_HORIZON,
      "nadciąga sztorm",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1() {
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    this._game.weatherService.setToken("storm", true, this._eventNamePL);
  }
}
