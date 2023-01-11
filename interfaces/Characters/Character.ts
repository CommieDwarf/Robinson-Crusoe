import { ICharEffects } from "./CharEffects";
import { IPawnService, IPawnServiceRenderData } from "../Pawns/Pawns";
import {
  ISkillService,
  ISkillServiceRenderData,
} from "../SkillService/SkillService";

export interface ICharacterRenderData {
  pawnService: IPawnServiceRenderData;
  name: CHARACTER;
  namePL: string;
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
  namePL: string;
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
