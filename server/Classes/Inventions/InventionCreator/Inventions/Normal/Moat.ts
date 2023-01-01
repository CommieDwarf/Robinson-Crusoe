import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { Resources } from "../../../../ResourceService/Resources";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class Moat extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.MOAT,
      { terrainType: null, inventions: [INVENTION_STARTER.SHOVEL] },
      INVENTION_TYPE.NORMAL,
      new Resources(0, 0, 1, 0),
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
