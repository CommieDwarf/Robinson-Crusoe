import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";

export class Shovel extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "shovel",
      { terrainType: TERRAIN_TYPE.BEACH, inventions: null },
      INVENTION_TYPE.STARTER,
      null,
      game
    );
  }

  onBuild() {
    return;
  }

  onDestruction() {
    return;
  }
}
