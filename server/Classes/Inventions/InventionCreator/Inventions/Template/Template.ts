import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";

export class Template extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "bricks",
      { terrainType: TERRAIN_TYPE.HILLS, inventions: null },
      INVENTION_TYPE.NORMAL,
      null,
      game
    );
  }

  onBuild() {}

  onDestruction() {}
}
