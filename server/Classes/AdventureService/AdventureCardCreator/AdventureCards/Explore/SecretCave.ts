import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class SecretCave extends ExploreAdventureCard implements IAdventureCard {
  protected _eventNamePL = "przebudzenie bestii";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.SECRET_CAVE,
      "tajemnicza jaskinia",
      true,
      game
    );
  }

  option1() {}

  option2() {
    //TODO: pull mystery cards
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    //TODO: fight beast.
  }
}