import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class Puma extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "atak pumy!";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.PUMA,
      "puma!",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1(resolver: ICharacter) {
    //TODO: implement night out of camp.
  }

  option2(resolver: ICharacter) {
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    //TODO: fight puma
  }
}
