import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { ICharacter } from "../../../../../../interfaces/Characters/Character";

export class ToolsBreak extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.TOOLS_BREAK,
      "pęknięte narzędzie",
      false,
      game,
      "discard",
      ""
    );
  }

  option1(resolver: ICharacter) {
    //TODO: implement flip invention
  }
}
