import { ISideCharacter } from "../Characters/SideCharacter";
import { IPlayerCharacter } from "../Characters/PlayerCharacter";

export interface IAllCharacters {
  characters: (ISideCharacter | IPlayerCharacter)[];
  removeFreePawn: (charName: string, draggableId: string) => void;
  removePawn: (charName: string, draggableId: string) => void;
  addPawn: (charName: string, draggableId: string) => void;
  addFreePawn: (charName: string, draggableId: string) => void;
  getCharacter: (charName: string) => ISideCharacter | IPlayerCharacter;
  hurtAllPlayerCharacters: (by: number) => void;
  decrDeterminationAllPlayerCharacters: (by: number) => void;
}
