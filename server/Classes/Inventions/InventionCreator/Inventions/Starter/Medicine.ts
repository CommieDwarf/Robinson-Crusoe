import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";

export class Medicine extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "medicine",
      { terrainType: TERRAIN_TYPE.PLAINS, inventions: null },
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
