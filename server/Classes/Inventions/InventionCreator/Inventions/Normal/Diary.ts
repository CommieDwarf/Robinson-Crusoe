import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { Resources } from "../../../../ResourceService/Resources";

export class Diary extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.DIARY,
      { terrainType: null, inventions: null },
      INVENTION_TYPE.NORMAL,
      new Resources(0, 0, 0, 1),
      game
    );
  }

  onBuild() {
    this._game.moraleService.diary = true;
  }

  onDestruction() {
    this._game.moraleService.diary = false;
  }
}
