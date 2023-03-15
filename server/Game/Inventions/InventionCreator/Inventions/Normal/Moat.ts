import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { BasicResources } from "../../../../ResourceService/BasicResources";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class Moat extends Invention implements IInvention {
  protected readonly _namePL = "ogrodzenie";

  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.MOAT,
      { terrainType: null, inventions: [INVENTION_STARTER.SHOVEL] },
      INVENTION_TYPE.NORMAL,
      new BasicResources(0, 0, 1, 0),
      game
    );
  }

  onBuild() {
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.PALISADE,
      2,
      this._logSource
    );
  }

  onDestruction() {
    this._game.constructionService.lvlDownIfPossible(
      CONSTRUCTION.PALISADE,
      2,
      this._logSource
    );
  }
}
