import { ISideCharacter } from "./SideCharacter";
import { IPlayerCharacter } from "./PlayerCharacter";

export interface ISkillInfo {
  namePL: string;
  description: string;
  quote: string;
}

export interface ISkill extends ISkillInfo {
  use: (character: IPlayerCharacter | ISideCharacter) => void;
}
