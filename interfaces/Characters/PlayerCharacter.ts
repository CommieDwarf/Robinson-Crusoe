import { IPlayer } from "../Player";
import { CharacterName, ICharacter, ICharacterRenderData } from "./Character";
import { IDictionary } from "../IDictionary";
import { ISkill } from "./Skill";

export type PlayerCharacterName = Exclude<CharacterName, "dog" | "friday">;

export interface IPlayerCharacterRenderData extends ICharacterRenderData {
  playerId: number;
  name: PlayerCharacterName;
  gender: "male" | "female";
  moraleThresholds: number[];
  skills: IDictionary<ISkill>;
}

export interface IPlayerCharacter extends ICharacter {
  player: IPlayer;
  name: PlayerCharacterName;
  gender: "male" | "female";
  moraleThresholds: number[];
  skills: IDictionary<ISkill>;
  renderData: IPlayerCharacterRenderData;
}
