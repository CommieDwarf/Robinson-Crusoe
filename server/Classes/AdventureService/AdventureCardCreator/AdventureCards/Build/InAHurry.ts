import { BuildAdventureCard } from "./BuildAdventureCard/BuildAdventureCard";
import { IAdventureCard } from "../../../../../../interfaces/AdventureService/AdventureCard";
import { IGame } from "../../../../../../interfaces/Game";
import { ADVENTURE_CARD_BUILD } from "../../../../../../interfaces/AdventureService/ADVENTURE_CARD";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class InAHurry extends BuildAdventureCard implements IAdventureCard {
  protected _eventNamePL = "trzask!";

  constructor(game: IGame) {
    super(ADVENTURE_CARD_BUILD.IN_A_HURRY, "w pośpiechu", true, game);
  }

  option1() {}

  option2() {
    // todo: add 2 discovery tokens
  }

  eventEffect() {
    this._game.constructionService.lvlDownOrSuffer(
      CONSTRUCTION.SHELTER,
      1,
      this.eventNamePL
    );
  }
}
