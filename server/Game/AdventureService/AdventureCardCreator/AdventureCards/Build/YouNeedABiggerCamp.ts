import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class YouNeedABiggerCamp
  extends BuildAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "rozbudowa obozowiska";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.YOU_NEED_A_BIGGER_CAMP,
      "potrzeba zmian",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1(resolver: ICharacter) {
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    //TODO: implement +1 wood consumption on every construction
  }
}
