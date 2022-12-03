import { IPawn, IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";

import { ICharacter } from "../../../../interfaces/Characters/Character";

export class Pawn implements IPawn {
  constructor(character: ICharacter, id: number) {
    this._character = character;
    this._draggableId = character.name + "pawn" + id;
  }

  public get renderData(): IPawnRenderData {
    return {
      draggableId: this.draggableId,
      character: {
        id: this.character.id,
        name: this.character.name,
        namePL: this.character.namePL,
        gender: this.character.gender,
      },
    };
  }

  get draggableId(): string {
    return this._draggableId;
  }

  get character(): ICharacter {
    return this._character;
  }

  private readonly _draggableId: string;
  private readonly _character: ICharacter;
}
