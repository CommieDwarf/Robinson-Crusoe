import {
  IInvention,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";
import { Resources } from "../../../../ResourceService/Resources";
import { Invention } from "../../Invention";

export class Axe extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "axe",
      { terrainType: TERRAIN_TYPE.MOUNTAINS, inventions: null },
      INVENTION_TYPE.SCENARIO,
      new Resources(0, 0, 1, 0),
      game
    );
  }

  onBuild() {
    this._game.tileService.axe = true;
  }

  onDestruction() {
    this._game.tileService.axe = false;
  }
}
