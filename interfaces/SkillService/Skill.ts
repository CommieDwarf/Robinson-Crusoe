import { ISideCharacter } from "../Characters/SideCharacter";
import { IPlayerCharacter } from "../Characters/PlayerCharacter";

export interface ISkillInfo {
  name: string;
  namePL: string;
  description: string;
  quote: string;
  phase: SkillPhase;
  phaseExcluded: SkillPhase;
}

export interface ISkill extends ISkillInfo {
  use: () => void;
  used: boolean;
  renderData: ISkillRenderData;
}

export interface ISkillRenderData {
  name: string;
  namePL: string;
  description: string;
  quote: string;
  phase: SkillPhase;
  phaseExcluded: SkillPhase;
}

export type SkillPhase = "night" | "action" | "weather" | "all" | "none";
