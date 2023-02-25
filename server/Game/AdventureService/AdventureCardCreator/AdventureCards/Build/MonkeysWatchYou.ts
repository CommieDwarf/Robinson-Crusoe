import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class MonkeysWatchYou
  extends BuildAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "małpy w obozie!";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.MONKEYS_WATCH_YOU,
      "małpy Cię obserwują",
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
    this._game.constructionService.setDividedLvlByTwo(
      CONSTRUCTION.ROOF,
      this._eventNamePL
    );
  }
}
