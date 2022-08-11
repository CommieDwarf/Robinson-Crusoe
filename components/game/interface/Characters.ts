import {
  CharacterName,
  ICharacter,
} from "../../../interfaces/Characters/Character";

export interface IAllCharacters {
  characters: ICharacter[];
  removeFreePawn: (charName: string, draggableId: string) => void;
  removePawn: (charName: string, draggableId: string) => void;
  addPawn: (charName: string, draggableId: string) => void;
  addFreePawn: (charName: string, draggableId: string) => void;
  getCharacter: (charName: string) => ICharacter;
}
