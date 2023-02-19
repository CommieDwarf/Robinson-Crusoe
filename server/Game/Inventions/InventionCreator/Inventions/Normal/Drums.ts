import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";
import { Resources } from "../../../../ResourceService/Resources";

export class Drums extends Invention implements IInvention {
  protected readonly _namePL = "bębny";

  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.DRUMS,
      { terrainType: TERRAIN_TYPE.HILLS, inventions: null },
      INVENTION_TYPE.NORMAL,
      new Resources(0, 0, 0, 1),
      game
    );
  }

  onBuild() {
    this._game.moraleService.drums = true;
  }

  onDestruction() {
    this._game.moraleService.drums = false;
  }
}
