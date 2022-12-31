import { IPlayer } from "../PlayerService/Player";
import { CHARACTER, ICharacter, ICharacterRenderData } from "./Character";

export type PlayerCharacterName = Exclude<CHARACTER, "dog" | "friday">;

export interface IPlayerCharacterRenderData extends ICharacterRenderData {
  playerId: number;
  name: PlayerCharacterName;
  moraleThresholds: number[];
}

export interface IPlayerCharacter extends ICharacter {
  player: IPlayer;
  name: PlayerCharacterName;
  moraleThresholds: number[];
  renderData: IPlayerCharacterRenderData;
  shouldMoraleDrop: boolean;
}
