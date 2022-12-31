import { ICharEffects } from "./CharEffects";
import { IPawnService, IPawnServiceRenderData } from "../Pawns/Pawns";
import {
  ISkillService,
  ISkillServiceRenderData,
} from "../SkillService/SkillService";
import { CHARACTER_PL } from "../TRANSLATE_PL/CATEGORIES/CHARACTER_PL";

export interface ICharacterRenderData {
  pawnService: IPawnServiceRenderData;
  name: CHARACTER;
  namePL: CHARACTER_PL;
  id: number;
  health: number;
  maxHealth: number;
  gender: Gender;
  determination: number;
  skillService: ISkillServiceRenderData;
}

export interface ICharacter {
  pawnService: IPawnService;
  name: CHARACTER;
  id: number;
  maxHealth: number;
  effects: ICharEffects;
  namePL: CHARACTER_PL;
  health: number;
  gender: Gender;
  getRenderData: () => ICharacterRenderData; // for the super usage I made it into a method.
  determination: number;
  skillService: ISkillService;

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
