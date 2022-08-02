import { ISkill, ISkillInfo } from "../../../interfaces/Characters/Skill";

export class Skill implements ISkill {
  use: () => void;
  namePL: string;
  description: string;
  quote: string;

  constructor(skillInfo: ISkillInfo, use: () => void) {
    this.namePL = skillInfo.namePL;
    this.description = skillInfo.description;
    this.quote = skillInfo.quote;
    this.use = use;
  }
}
