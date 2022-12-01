import {ISkill, ISkillRenderData} from "./Skill";

export interface ISkillService {
  skills: Map<string, ISkill>;

  renderData: ISkillServiceRenderData;

  getSkill: (name: string) => ISkill;
  useSkill: (name: string) => void;
}

export interface ISkillServiceRenderData {
  skills: ISkillRenderData[];
}