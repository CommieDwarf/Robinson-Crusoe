import { HelperPawnInvention } from "../../HelperPawnInvention";
import {
  IInvention,
  INVENTION_NORMAL,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { PAWN_HELPER_ACTION } from "../../../../../../interfaces/Pawns/Pawn";
import { BasicResources } from "../../../../ResourceService/BasicResources";

export class Raft extends HelperPawnInvention implements IInvention {
  protected readonly _namePL = "tratwa";

  constructor(game: IGame) {
    super(
      INVENTION_NORMAL.RAFT,
      { terrainType: null, inventions: [INVENTION_STARTER.ROPE] },
      INVENTION_TYPE.NORMAL,
      new BasicResources(0, 0, 2, 0),
      game,
      PAWN_HELPER_ACTION.GATHER_EXPLORE
    );
  }

  onBuild() {
    super.onBuild();
  }

  onDestruction() {
    super.onDestruction();
  }
}
