import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";

export class Furnace extends Invention implements IInvention {
  protected readonly _namePL = "piec";

  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.FURNACE,
      { terrainType: null, inventions: [INVENTION_STARTER.BRICKS] },
      INVENTION_TYPE.NORMAL,
      null,
      game
    );
  }

  onBuild() {
    this._game.weatherService.furnace = true;
  }

  onDestruction() {
    this._game.weatherService.furnace = false;
  }
}
