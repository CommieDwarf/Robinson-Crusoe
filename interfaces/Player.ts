import { ICharacter } from "./Characters/Character";
import { IPlayerCharacter } from "./Characters/PlayerCharacter";

export interface IPlayerRenderData {
  name: string;
  color: string;
  characterId: number;
  id: number;
}

export interface IPlayer {
  name: string;
  color: string;
  getCharacter: () => IPlayerCharacter;
  setCharacter: (character: IPlayerCharacter) => void;
  id: number;

  renderData: IPlayerRenderData;
}
