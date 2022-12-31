import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { Resources } from "../../../../ResourceService/Resources";

export class Pit extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "pit",
      {
        terrainType: null,
        inventions: [INVENTION_STARTER.SHOVEL],
      },
      INVENTION_TYPE.NORMAL,
      new Resources(0, 0, 1, 0),
      game
    );
  }

  onBuild() {
    this._game.resourceService.pit = true;
  }

  onDestruction() {
    this._game.resourceService.pit = false;
  }
}
