import {
  IPawnHelper,
  IPawnHelperRenderData,
  PAWN_HELPER_ACTION,
} from "../../../../interfaces/Pawns/Pawn";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { Pawn } from "./Pawn";

export class PawnHelper extends Pawn implements IPawnHelper {
  action: PAWN_HELPER_ACTION;
  disposable: boolean;
  disposed = false;

  constructor(
    character: IPlayerCharacter,
    disposable: boolean,
    action: PAWN_HELPER_ACTION
  ) {
    super(character, character.pawnService.pawns.length);
    this.action = action;
    this.disposable = disposable;
  }

  get renderData(): IPawnHelperRenderData {
    return {
      ...super.getRenderData(),
      action: this.action,
      disposable: this.disposable,
    };
  }
}
