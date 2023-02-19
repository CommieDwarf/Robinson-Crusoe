import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { Resources } from "../../../../ResourceService/Resources";

export class Corral extends Invention implements IInvention {
  protected readonly _namePL = "zagroda";

  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.CORRAL,
      { terrainType: null, inventions: [INVENTION_STARTER.ROPE] },
      INVENTION_TYPE.NORMAL,
      new Resources(0, 0, 1, 0),
      game
    );
  }

  onBuild() {
    //TODO: implement
  }

  onDestruction() {
    //TODO: implement
  }
}
