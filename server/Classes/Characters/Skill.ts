import { ICharacter } from "../../../interfaces/Characters/Character";
import { ISkill, ISkillInfo } from "../../../interfaces/Characters/Skill";

export class SkillInfo implements SkillInfo {
  quote: string;
  description: string;
  namePL: string;

  constructor(namePL: string, description: string, quote: string) {
    this.namePL = namePL;
    this.quote = quote;
    this.description = description;
  }
}

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
