import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";

export class Bamboo extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "trzask łamanego drewna!";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.BAMBOO,
      "bambus",
      true,
      game,
      "discard",
      "shuffle"
    );
  }

  option1() {}

  option2() {
    this._game.resourceService.addResourceToOwned("wood", 2, this._namePL);
    this.shuffleIntoEventDeck();
  }

  triggerEffect() {
    //TODO: implement choice between -1 roof and -1 palisade.
  }
}
