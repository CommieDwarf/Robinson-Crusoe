import { IAllCharacters } from "../../../components/game/interface/Characters";
import {
  CharacterName,
  ICharacter,
} from "../../../interfaces/Characters/Character";

export class AllCharacters implements IAllCharacters {
  characters: ICharacter[];

  constructor(characters: ICharacter[]) {
    this.characters = characters;
  }

  removeFreePawn(charName: string, draggableId: string): void {
    this.getCharacter(charName).pawns.removePawn(draggableId, "freePawns");
  }

  removePawn(charName: string, draggableId: string) {
    this.getCharacter(charName).pawns.removePawn(draggableId, "pawns");
  }

  addFreePawn(charName: string, draggableId: string) {
    this.getCharacter(charName).pawns.copyPawnToFreePawns(draggableId);
  }

  addPawn(charName: string, draggableId: string): void {}

  getCharacter(charName: string) {
    const character = this.characters.find((char) => char.name === charName);
    if (!character) {
      throw new Error("Couldn't find character with name: " + charName);
    }
    return character;
  }
}
