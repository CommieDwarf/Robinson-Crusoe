import { ICharacter } from "./Characters/Character";
import { IPlayerCharacter } from "./Characters/PlayerCharacter";

export interface IPlayer {
  name: string;
  color: string;
  getCharacter: () => IPlayerCharacter;
  setCharacter: (character: IPlayerCharacter) => void;
  id: number;
}
