import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class EmptyForest
  extends ExploreAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "głodne drapieżniki";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_EXPLORE.EMPTY_FOREST, "pusty las", false, game);
  }

  option1() {
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    //TODO: implement token at hunt which makes beast stronger.
  }
}
