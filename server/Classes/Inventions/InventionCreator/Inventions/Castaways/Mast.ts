import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { Resources } from "../../../../ResourceService/Resources";

export class Mast extends Invention implements IInvention {
  constructor(game: IGame) {
    super(
      "mast",
      { terrainType: null, inventions: [INVENTION_STARTER.ROPE] },
      INVENTION_TYPE.SCENARIO,
      new Resources(0, 0, 1, 1),
      game
    );
  }

  onBuild() {
    //TODO: put 3 wood on the stash
  }

  onDestruction() {
    return;
  }
}
