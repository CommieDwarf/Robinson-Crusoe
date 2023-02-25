import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class HardWork extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.HARD_WORK,
      "ciężka praca",
      false,
      game,
      "discard",
      ""
    );
  }

  option1(resolver: ICharacter) {
    this._game.resourceService.spendResourceIfPossible("food", 1, this._namePL);
  }
}
