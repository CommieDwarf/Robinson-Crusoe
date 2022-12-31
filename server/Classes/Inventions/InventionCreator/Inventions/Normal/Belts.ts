import {
  IInvention,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { HelperPawnInvention } from "../../HelperPawnInvention";
import { PAWN_HELPER_ACTION } from "../../../../../../interfaces/Pawns/Pawn";

export class Belts extends HelperPawnInvention implements IInvention {
  constructor(game: IGame) {
    super(
      "belts",
      { terrainType: null, inventions: [INVENTION_STARTER.KNIFE] },
      INVENTION_TYPE.NORMAL,
      null,
      game,
      PAWN_HELPER_ACTION.GATHER
    );
  }

  onBuild() {
    super.onBuild();
  }

  onDestruction() {
    super.onDestruction();
  }
}
