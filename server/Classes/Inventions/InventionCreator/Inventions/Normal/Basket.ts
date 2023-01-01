import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";

export class Basket extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.BASKET,
      { terrainType: TERRAIN_TYPE.PLAINS, inventions: null },
      INVENTION_TYPE.NORMAL,
      null,
      game
    );
  }

  onBuild() {
    this._game.tileService.basket = true;
  }

  onDestruction() {
    this._game.tileService.basket = false;
  }
}
