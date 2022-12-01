import {
  ISkill,
  ISkillInfo,
  ISkillRenderData,
  SkillPhase,
} from "../../../interfaces/SkillService/Skill";

export class Skill implements ISkill {
  public readonly use: () => void;
  private readonly _name: string;
  private readonly _namePL: string;
  private readonly _description: string;

  private readonly _quote: string;
  private readonly _phase: SkillPhase;
  private readonly _phaseExcluded: SkillPhase | "none";
  private _used = false;

  constructor(skillInfo: ISkillInfo, use: () => void) {
    this._name = skillInfo.name;
    this._namePL = skillInfo.namePL;
    this._description = skillInfo.description;
    this._quote = skillInfo.quote;
    this.use = use;
    this._phase = skillInfo.phase;
    this._phaseExcluded = skillInfo.phaseExcluded;
  }

  get renderData(): ISkillRenderData {
    return {
      name: this._name,
      namePL: this._namePL,
      description: this._description,
      quote: this._quote,
      phase: this._phase,
      phaseExcluded: this._phaseExcluded,
    };
  }

  get used(): boolean {
    return this._used;
  }

  get name(): string {
    return this._name;
  }

  get namePL(): string {
    return this._namePL;
  }

  get description(): string {
    return this._description;
  }

  get quote(): string {
    return this._quote;
  }

  get phase(): SkillPhase {
    return this._phase;
  }

  get phaseExcluded(): SkillPhase | "none" {
    return this._phaseExcluded;
  }
}
