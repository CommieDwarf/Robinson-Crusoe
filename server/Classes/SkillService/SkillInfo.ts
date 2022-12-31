import { ISkillInfo, SkillPhase } from "../../../interfaces/SkillService/Skill";

export class SkillInfo implements ISkillInfo {
  private readonly _name: string;
  private readonly _namePL: string;
  private readonly _quote: string;
  private readonly _description: string;
  private readonly _phase: SkillPhase;
  private readonly _phaseExcluded: SkillPhase | "none";

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
