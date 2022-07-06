import ICharacter from "./Character";

export interface IPlayer {
    name: string;
    color: string;
    character: ICharacter;
}