import { Invention } from "./Invention";
import {
  IInvention,
  INVENTION,
  INVENTION_TYPE,
  InventionRequirements,
} from "../../../../interfaces/InventionService/Invention";
import { IGame } from "../../../../interfaces/Game";
import { IBasicResources } from "../../../../interfaces/Resources/Resources";
import { PAWN_HELPER_ACTION } from "../../../../interfaces/Pawns/Pawn";
import { PawnHelper } from "../../PawnService/Pawn/PawnHelper";
import { ICharacter } from "../../../../interfaces/Characters/Character";
import { IPlayerCharacter } from "../../../../interfaces/Characters/PlayerCharacter";

export class HelperPawnInvention extends Invention implements IInvention {
  protected _pawnHelperAction: PAWN_HELPER_ACTION;
  protected _character: ICharacter | null = null;
  protected _pawnID = "";

  constructor(
    name: INVENTION,
    requirements: InventionRequirements,
    type: INVENTION_TYPE,
    cost: IBasicResources | null,
    game: IGame,
    pawnHelperAction: PAWN_HELPER_ACTION
  ) {
    super(name, requirements, type, cost, game);
    this._pawnHelperAction = pawnHelperAction;
  }

  onBuild() {
    this._character = this.getLeader();
    if (this._character.name === "friday") {
      this._character = this._game.playerService.primePlayer.getCharacter();
    }

    const helperPawn = new PawnHelper(
      this._character as IPlayerCharacter,
      false,
      this._pawnHelperAction
    );
    this._pawnID = helperPawn.draggableId;
    this._character.pawnService.addPawn(helperPawn);
  }

  onDestruction() {
    this._character?.pawnService.removePawn(this._pawnID, "pawns");
    this._character = null;
    this._pawnID = "";
  }
}
