import {
  IPlayerCharacter,
  IPlayerCharacterRenderData,
} from "../Characters/PlayerCharacter";

export interface IPlayerRenderData {
  name: string;
  color: string;
  character: IPlayerCharacterRenderData;
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
