import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { TERRAIN_TYPE } from "../../../../../../interfaces/TileService/ITile";

export class Pot extends Invention implements IInvention {
  protected readonly _namePL = "naczynia";

  constructor(game: IGame) {
    super(
      INVENTION_STARTER.POT,
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
