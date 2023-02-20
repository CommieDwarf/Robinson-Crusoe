import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class LackOfHope extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.LACK_OF_HOPE,
      "brak nadziei!",
      false,
      game,
      "discard",
      ""
    );
  }

  option1() {
    //todo: discard 3 inventions
  }
}
