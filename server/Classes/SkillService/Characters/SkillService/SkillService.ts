import {
  ISkillService,
  ISkillServiceRenderData,
} from "../../../../../interfaces/SkillService/SkillService";
import { IGame } from "../../../../../interfaces/Game";
import { ICharacter } from "../../../../../interfaces/Characters/Character";
import { ISkill } from "../../../../../interfaces/SkillService/Skill";

export abstract class SkillService implements ISkillService {
  protected readonly _game: IGame;
  protected readonly _character: ICharacter;
  protected declare _skills: Map<string, ISkill>;

  constructor(game: IGame, character: ICharacter) {
    this._game = game;
    this._character = character;
  }

  get renderData(): ISkillServiceRenderData {
    return {
      skills: Array.from(this._skills.values()).map(
        (skill) => skill.renderData
      ),
    };
  }

  getSkill(name: string): ISkill {
    const skill = this.skills.get(name);
    if (!skill) {
      throw new Error("Can't find skill with given name: " + name);
    }
    return skill;
  }

  useSkill(name: string): void {
    this.getSkill(name).use();
  }

  get skills(): Map<string, ISkill> {
    return this._skills;
  }
}
