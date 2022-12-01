import { ISkillInfo, SkillPhase } from "../../../interfaces/SkillService/Skill";

export class SkillInfo implements ISkillInfo {
  private _name: string;
  private _namePL: string;
  private _quote: string;
  private _description: string;
  private _phase: SkillPhase;
  private _phaseExcluded: SkillPhase | "none";

  constructor(
    name: string,
    namePL: string,
    description: string,
    quote: string,
    phase: SkillPhase,
    phaseExcluded: SkillPhase | "none"
  ) {
    this._name = name;
    this._namePL = namePL;
    this._quote = quote;
    this._description = description;
    this._phase = phase;
    this._phaseExcluded = phaseExcluded;
  }

  get name(): string {
    return this._name;
  }

  get namePL(): string {
    return this._namePL;
  }

  get quote(): string {
    return this._quote;
  }

  get description(): string {
    return this._description;
  }

  get phase(): SkillPhase {
    return this._phase;
  }

  get phaseExcluded(): SkillPhase | "none" {
    return this._phaseExcluded;
  }
}
