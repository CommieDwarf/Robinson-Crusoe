import { HelperPawnInvention } from "../../HelperPawnInvention";
import {
  IInvention,
  INVENTION_STARTER,
  INVENTION_TYPE,
} from "../../../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../../../interfaces/Game";
import { Resources } from "../../../../ResourceService/Resources";
import { PAWN_HELPER_ACTION } from "../../../../../../interfaces/Pawns/Pawn";

export class Shield extends HelperPawnInvention implements IInvention {
  constructor(game: IGame) {
    super(
      "shield",
      { terrainType: null, inventions: [INVENTION_STARTER.ROPE] },
      INVENTION_TYPE.NORMAL,
      new Resources(0, 0, 1, 0),
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
