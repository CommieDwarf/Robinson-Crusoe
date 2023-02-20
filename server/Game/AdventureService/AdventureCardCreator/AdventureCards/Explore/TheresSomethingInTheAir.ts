import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class TheresSomethingInTheAir
  extends ExploreAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "przeklęta wyspa";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.THERES_SOMETHING_IN_THE_AIR,
      "coś się szykuje",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1() {
    this._game.actionService.setAdventureToken("explore", true, this._namePL);
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    this._game.actionService.setAdventureToken("explore", true, this._namePL);
  }
}
