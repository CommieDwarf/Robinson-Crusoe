import { ISkillInfo } from "../../../interfaces/Characters/Skill";

export class SkillInfo implements ISkillInfo {
  quote: string;
  description: string;
  namePL: string;

  constructor(namePL: string, description: string, quote: string) {
    this.namePL = namePL;
    this.quote = quote;
    this.description = description;
  }
}