import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class NastyWound extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "zakażenie";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.NASTY_WOUND,
      "paskudna rana",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1(resolver: ICharacter) {
    //TODO: set wound
    this.shuffleIntoEventDeck();
  }

  triggerEventEffect() {
    //TODO: implement
  }
}
