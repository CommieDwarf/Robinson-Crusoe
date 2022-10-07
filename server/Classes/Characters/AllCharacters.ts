import {IAllCharacters} from "../../../interfaces/AllCharacters/Characters";
import {
  CharacterName,
  ICharacter,
} from "../../../interfaces/Characters/Character";
import {IPlayerCharacter} from "../../../interfaces/Characters/PlayerCharacter";
import {ISideCharacter} from "../../../interfaces/Characters/SideCharacter";
import {PlayerCharacter} from "./PlayerCharacter";

export class AllCharacters implements IAllCharacters {
  characters: (IPlayerCharacter | ISideCharacter)[];

  constructor(characters: (IPlayerCharacter | ISideCharacter)[]) {
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

  addPawn(charName: string, draggableId: string): void {
  }

  getCharacter(charName: string) {
    const character = this.characters.find((char) => char.name === charName);
    if (!character) {
      throw new Error("Couldn't find character with name: " + charName);
    }
    return character;
  }

  hurtAllPlayerCharacters(by: number) {
    this.characters.forEach((char) => {
      if (char instanceof PlayerCharacter) {
        char.getHurt(by);
      }
    });
  }

  decrDeterminationAllPlayerCharacters(by: number) {
    this.characters.forEach((char) => {
      if (char instanceof PlayerCharacter) {
        char.decrementDetermination(by);
      }
    })
  }
}

