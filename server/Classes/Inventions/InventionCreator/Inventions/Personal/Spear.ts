import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_PERSONAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { Resources } from "../../../../ResourceService/Resources";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class Spear extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      INVENTION_PERSONAL.SPEAR,
      { terrainType: null, inventions: [INVENTION_STARTER.KNIFE] },
      INVENTION_TYPE.NORMAL,
      new Resources(0, 0, 1, 0),
      game
    );
  }

  onBuild() {
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.WEAPON,
      3,
      this.name
    );
  }

  onDestruction() {
    this._game.constructionService.lvlDownIfPossible(
      CONSTRUCTION.WEAPON,
      3,
      this.name
    );
  }
}
