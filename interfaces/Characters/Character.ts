import { ICharEffects } from "./CharEffects";
import { IPawnService, IPawnServiceRenderData } from "../Pawns/Pawns";
import { ISkill, ISkillRenderData } from "../Skill/Skill";
import { ActionDice } from "../RollDice/RollDice";

export interface ICharacterRenderData {
  pawnService: IPawnServiceRenderData;
  name: CHARACTER;
  namePL: string;
  id: number;
  health: number;
  maxHealth: number;
  gender: Gender;
  determination: number;
  skills: ISkillRenderData[];
}

export interface ICharacter {
  pawnService: IPawnService;
  name: CHARACTER;
  id: number;
  maxHealth: number;
  effects: ICharEffects;
  skills: ISkill[];
  useSkill: (name: string, target: ICharacter | ActionDice | null) => void;
  refreshSkills: () => void;
  namePL: string;
  health: number;
  gender: Gender;
  getRenderData: () => ICharacterRenderData;
  determination: number;
  incrDetermination: (by: number) => void;
  decrDetermination: (by: number) => void;
  hurt: (by: number) => void;
  heal: (by: number) => void;
}

export enum CHARACTER {
  EXPLORER = "explorer",
  CARPENTER = "carpenter",
  COOK = "cook",
  SOLDIER = "soldier",
  DOG = "dog",
  FRIDAY = "friday",
}

export type Gender = "male" | "female";
