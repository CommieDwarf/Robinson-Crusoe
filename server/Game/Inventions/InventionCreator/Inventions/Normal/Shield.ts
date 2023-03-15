import { HelperPawnInvention } from "../../HelperPawnInvention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { BasicResources } from "../../../../ResourceService/BasicResources";
import { PAWN_HELPER_ACTION } from "../../../../../../interfaces/Pawns/Pawn";

export class Shield extends HelperPawnInvention implements IInvention {
  protected readonly _namePL = "tarcza";

  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.SHIELD,
      { terrainType: null, inventions: [INVENTION_STARTER.ROPE] },
      INVENTION_TYPE.NORMAL,
      new BasicResources(0, 0, 1, 0),
      game,
      PAWN_HELPER_ACTION.HUNT
    );
  }

  onBuild() {
    super.onBuild();
  }

  onDestruction() {
    super.onDestruction();
  }
}
