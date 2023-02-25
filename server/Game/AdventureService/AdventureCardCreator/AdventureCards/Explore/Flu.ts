import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

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

  option1(resolver: ICharacter) {
    this._game.resourceService.spendResourceOrGetHurt("food", 1, this._namePL);
  }

  option2(resolver: ICharacter) {
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    //TODO: implement double food consumption or get hurt.
  }
}
