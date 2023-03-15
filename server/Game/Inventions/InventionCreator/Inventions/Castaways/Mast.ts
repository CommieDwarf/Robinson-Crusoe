import { Invention } from "../../Invention";
import {
  IInvention,
  INVENTION_CASTAWAYS,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { BasicResources } from "../../../../ResourceService/BasicResources";

export class Mast extends Invention implements IInvention {
  protected readonly _namePL = "maszt";

  constructor(game: IGame) {
    super(
      INVENTION_CASTAWAYS.MAST,
      { terrainType: null, inventions: [INVENTION_STARTER.ROPE] },
      INVENTION_TYPE.SCENARIO,
      new BasicResources(0, 0, 1, 1),
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
