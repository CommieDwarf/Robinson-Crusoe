import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class Wall extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.WALL,
      { terrainType: null, inventions: [INVENTION_STARTER.BRICKS] },
      INVENTION_TYPE.NORMAL,
      null,
      game
    );
  }

  onBuild() {
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.PALISADE,
      2,
      this.name
    );
  }

  onDestruction() {
    this._game.constructionService.lvlDownIfPossible(
      CONSTRUCTION.PALISADE,
      2,
      this.name
    );
  }
}
