import { IPawnHelper } from "../../../../interfaces/Pawns/Pawn";
import { HelperAction } from "../../../../interfaces/Action";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";
import { Pawn } from "./Pawn";

export class HelperPawn extends Pawn implements IPawnHelper {
  action: HelperAction;
  disposable: boolean;

  constructor(
    character: IPlayerCharacter,
    disposable: boolean,
    action: HelperAction
  ) {
    super(character, character.pawnService.pawns.length);
    this.action = action;
    this.disposable = disposable;
  }
}
