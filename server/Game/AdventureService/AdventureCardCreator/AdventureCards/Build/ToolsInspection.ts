import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";

export class ToolsInspection
  extends BuildAdventureCard
  implements IAdventureCard
{
  protected _eventNamePL = "zepsute narzędzia";

  constructor(game: IGame) {
    super(
      ADVENTURE_CARD_BUILD.TOOLS_INSPECTION,
      "kontrola narzędzi",
      false,
      game,
      "shuffle",
      ""
    );
  }

  option1() {
    //TODO: implement marks on 2 inventions
  }

  triggerEffect() {
    //TODO: implement flip marked inventions
  }
}
