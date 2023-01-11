import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class Vipers extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "gorączka";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_EXPLORE.VIPERS, "żmije!", false, game);
  }

  option1() {
    //TODO: put wound.
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    //TODO: implement.
  }
}