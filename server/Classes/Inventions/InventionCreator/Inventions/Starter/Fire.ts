import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";
import { CONSTRUCTION } from "../../../../../../interfaces/ConstructionService/Construction";

export class Fire extends Invention implements IInvention {
  protected readonly _namePL = "ogień";

  constructor(game: IGame) {
    super(
      INVENTION_STARTER.FIRE,
      { terrainType: TERRAIN_TYPE.MOUNTAINS, inventions: null },
      INVENTION_TYPE.STARTER,
      null,
      game
    );
  }

  onBuild() {
    this._game.constructionService.lvlUpConstruction(
      CONSTRUCTION.PALISADE,
      1,
      this._logSource
    );
  }

  onDestruction() {
    this._game.constructionService.lvlDownIfPossible(
      CONSTRUCTION.PALISADE,
      1,
      this._logSource
    );
  }
}
