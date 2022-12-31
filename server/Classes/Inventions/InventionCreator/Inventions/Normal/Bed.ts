import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";

export class Bed extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "bed",
      { terrainType: TERRAIN_TYPE.PLAINS, inventions: null },
      INVENTION_TYPE.NORMAL,
      null,
      game
    );
  }

  onBuild() {
    this._game.arrangeCampRestService.bed = true;
  }

  onDestruction() {
    this._game.arrangeCampRestService.bed = false;
  }
}
