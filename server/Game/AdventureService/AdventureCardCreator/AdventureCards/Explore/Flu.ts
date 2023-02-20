import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class Flu extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "ból gardła";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.FLU,
      "grypa",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1() {
    this._game.resourceService.spendResourceOrGetHurt("food", 1, this._namePL);
  }

  option2() {
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    //TODO: implement double food consumption or get hurt.
  }
}
