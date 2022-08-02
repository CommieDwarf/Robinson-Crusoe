import { ICharacter } from "./Characters/Character";

export interface IPlayer {
  name: string;
  color: string;
  getCharacter: () => ICharacter | null;
  setCharacter: (character: ICharacter | null) => void;
  id: number;
}
