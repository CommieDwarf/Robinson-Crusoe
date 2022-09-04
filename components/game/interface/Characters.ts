import { ISideCharacter } from "../../../interfaces/Characters/SideCharacter";
import { IPlayerCharacter } from "../../../interfaces/Characters/PlayerCharacter";

export interface IAllCharacters {
  characters: (ISideCharacter | IPlayerCharacter)[];
  removeFreePawn: (charName: string, draggableId: string) => void;
  removePawn: (charName: string, draggableId: string) => void;
  addPawn: (charName: string, draggableId: string) => void;
  addFreePawn: (charName: string, draggableId: string) => void;
  getCharacter: (charName: string) => ISideCharacter | IPlayerCharacter;
}
