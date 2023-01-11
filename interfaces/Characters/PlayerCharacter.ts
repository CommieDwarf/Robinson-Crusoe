import { IPlayer } from "../PlayerService/Player";
import { CHARACTER, ICharacter, ICharacterRenderData } from "./Character";
import { ISkill, ISkillRenderData } from "../Skill/Skill";

export type PlayerCharacterName = Exclude<CHARACTER, "dog" | "friday">;

export interface IPlayerCharacter extends ICharacter {
  player: IPlayer;
  name: PlayerCharacterName;
  moraleThresholds: number[];
  renderData: IPlayerCharacterRenderData;
  shouldMoraleDrop: boolean;
  skills: ISkill[];
}

export interface IPlayerCharacterRenderData extends ICharacterRenderData {
  playerId: number;
  name: PlayerCharacterName;
  moraleThresholds: number[];
  skills: ISkillRenderData[];
}
