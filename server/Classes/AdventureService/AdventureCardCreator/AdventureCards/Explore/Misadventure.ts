import { ExploreAdventureCard } from "./ExploreAdventureCard/ExploreAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_EXPLORE } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class Misadventure
  extends ExploreAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "spuchnięta kostka";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_EXPLORE.MISADVENTURE,
      "nieszczęśliwy wypadek",
      false,
      game
    );
  }

  option1() {
    //TODO: implement wound
    this.shuffleIntoEventDeck();
  }

  eventEffect() {
    //TODO: implement action reduction
    // to rest, arrange camp, build.
    // Discard wound
  }
}
