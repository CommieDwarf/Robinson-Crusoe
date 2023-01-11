import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";
import { Resources } from "../../../../ResourceService/Resources";

export class Dam extends Invention implements IInvention {
  protected readonly _namePL = "tama";

  constructor(game: IGame) {
    super(
      INVENTION_STARTER.DAM,
      { terrainType: TERRAIN_TYPE.RIVER, inventions: null },
      INVENTION_TYPE.STARTER,
      new Resources(0, 0, 1, 0),
      game
    );
  }

  onBuild() {
    this._game.resourceService.addResourceToFuture(
      "dryFood",
      2,
      this._logSource
    );
  }

  onDestruction() {
    this._game.resourceService.spendResourceIfPossible(
      "dryFood",
      2,
      this._logSource
    );
  }
}
