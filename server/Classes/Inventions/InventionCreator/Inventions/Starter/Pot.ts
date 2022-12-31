import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";

export class Pot extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "pot",
      { terrainType: TERRAIN_TYPE.HILLS, inventions: null },
      INVENTION_TYPE.STARTER,
      null,
      game
    );
  }

  // TODO: implement somewhere healing from food.
  onBuild() {
    return;
  }

  onDestruction() {
    return;
  }
}
