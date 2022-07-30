import { IPawn } from "../../../interfaces/Pawn";
import { ISideCharacter } from "../../../interfaces/Characters/SideCharacter";
import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";
import { ICharacter } from "../../../interfaces/Characters/Character";

export class Pawn implements IPawn {
  draggableId: string;
  character: IPlayerCharacter | ISideCharacter;

  constructor(id: number, character: ICharacter) {
    this.draggableId = character.name + "pawn" + id;
    this.character = character;
  }
}
