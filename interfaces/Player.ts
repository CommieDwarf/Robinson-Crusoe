import ICharacter from "./Characters/Character";

export interface IPlayer {
  name: string;
  color: string;
  character: ICharacter;
}