import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class HowlingInTheBushes
  extends BuildAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "bestia jest tutaj!";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.HOWLING_IN_THE_BUSHES,
      "wycie w buszu",
      false,
      game
    );
  }

  option1() {
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    //todo: implement fighting beast by prime player
  }
}
