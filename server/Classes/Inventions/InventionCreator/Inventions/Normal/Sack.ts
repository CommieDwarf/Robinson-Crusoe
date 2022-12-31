import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { Resources } from "../../../../ResourceService/Resources";

export class Sack extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "sack",
      { terrainType: null, inventions: null },
      INVENTION_TYPE.NORMAL,
      new Resources(0, 0, 0, 1),
      game
    );
  }

  onBuild() {
    this._game.tileService.sack = true;
  }

  onDestruction() {
    this._game.tileService.sack = false;
  }
}
