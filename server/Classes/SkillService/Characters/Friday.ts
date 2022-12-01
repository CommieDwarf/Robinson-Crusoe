import { ISkillService } from "../../../../interfaces/SkillService/SkillService";
import { IGame } from "../../../../interfaces/Game";
import { ICharacter } from "../../../../interfaces/Characters/Character";
import { ISkill } from "../../../../interfaces/SkillService/Skill";
import { Skill } from "../Skill";
import { SkillInfo } from "../SkillInfo";
import { SkillService } from "./SkillService/SkillService";

export class Friday extends SkillService implements ISkillService {
  constructor(game: IGame, character: ICharacter) {
    super(game, character);
    this._skills = this.getSkills();
  }

  private useReRoll() {}

  private getSkills() {
    const skills = new Map<string, ISkill>();
    skills.set("reRoll", new Skill(reRollInfo, this.useReRoll));
    return skills;
  }
}

const reRollInfo = new SkillInfo(
  "reRoll",
  "Przerzut kością",
  "Może odrzucić 2 $determination$ aby raz przerzucić dowolną kość akcji.",
  "",
  "action",
  "none"
);
