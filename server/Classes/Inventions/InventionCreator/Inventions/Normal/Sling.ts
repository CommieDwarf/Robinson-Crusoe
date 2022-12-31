import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { Resources } from "../../../../ResourceService/Resources";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class Sling extends Invention implements IInvention {
  protected _resourceChoice = true;

  constructor(game: IGame) {
    super(
      "sling",
      { terrainType: null, inventions: null },
      INVENTION_TYPE.NORMAL,
      new Resources(0, 0, 1, 1),
      game
    );
  }

  onBuild() {
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.WEAPON,
      2,
      this.name
    );
  }

  onDestruction() {
    this._game.constructionService.lvlDownIfPossible(
      CONSTRUCTION.WEAPON,
      2,
      this.name
    );
  }
}
