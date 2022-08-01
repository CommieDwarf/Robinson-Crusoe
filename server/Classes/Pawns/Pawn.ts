import { IPawn, IPawnHelper } from "../../../interfaces/Pawns/Pawn";
import { ISideCharacter } from "../../../interfaces/Characters/SideCharacter";
import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../interfaces/Characters/Character";
import { HelperAction } from "../../../interfaces/Action";

export class Pawn implements IPawn {
  get draggableId(): string {
    return this._draggableId;
  }

  get character(): ICharacter {
    return this._character;
  }

  private readonly _draggableId: string;
  private readonly _character: ICharacter;

  constructor(id: number, character: ICharacter) {
    this._draggableId = character.name + "pawn" + id;
    this._character = character;
  }
}

export class HelperPawn extends Pawn implements IPawnHelper {
  action: HelperAction;
  disposable: boolean;

  constructor(
    id: number,
    character: IPlayerCharacter,
    disposable: boolean,
    action: HelperAction
  ) {
    super(id, character);
    this.action = action;
    this.disposable = disposable;
  }
}
