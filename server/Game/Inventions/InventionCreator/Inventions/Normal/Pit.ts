import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { BasicResources } from "../../../../ResourceService/BasicResources";

export class Pit extends Invention implements IInvention {
  protected readonly _namePL = "wilczy dół";

  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.PIT,
      {
        terrainType: null,
        inventions: [INVENTION_STARTER.SHOVEL],
      },
      INVENTION_TYPE.NORMAL,
      new BasicResources(0, 0, 1, 0),
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
