import { IPawn, IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";

import { IPlayerCharacter } from "../../../../interfaces/Characters/Character";

export class Pawn implements IPawn {
  constructor(character: IPlayerCharacter, id: number) {
    this._character = character;
    this._draggableId = character.name + "pawn" + id;
  }

  get renderData(): IPawnRenderData {
    return this.getRenderData();
  }

  get draggableId(): string {
    return this._draggableId;
  }

  get character(): IPlayerCharacter {
    return this._character;
  }

  protected getRenderData(): IPawnRenderData {
    return {
      draggableId: this.draggableId,
      character: {
        id: this.character.id,
        name: this.character.name,
        namePL: this.character.namePL,
        gender: this.character.gender,
        skills: this.character.skills.map((skill) => skill.renderData),
        determination: this.character.determination,
      },
    };
  }

  private readonly _draggableId: string;
  private readonly _character: IPlayerCharacter;
}
