import {
  IPawnHelper,
  PAWN_HELPER_ACTION,
} from "../../../../interfaces/Pawns/Pawn";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { Pawn } from "./Pawn";

export class HelperPawn extends Pawn implements IPawnHelper {
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

  get renderData() {
    return {
      draggableId: this.draggableId,
      character: {
        id: this.character.id,
        name: this.character.name,
        namePL: this.character.namePL,
        gender: this.character.gender,
      },
      action: this.action,
      disposable: this.disposable,
    };
  }
}
