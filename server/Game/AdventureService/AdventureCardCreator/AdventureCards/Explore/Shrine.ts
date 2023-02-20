import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class Shrine extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "koszmary";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.SHRINE,
      "kapliczka",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1() {}

  option2() {
    //TODO: implement mystery card pull.
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    //TODO: implement reRoll action.
  }
}
