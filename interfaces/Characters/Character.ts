import { ICharEffects } from "./CharEffects";
import { IPawnService, IPawnServiceRenderData } from "../Pawns/Pawns";
import { IPawnRenderData } from "../Pawns/Pawn";
import {
  ISkillService,
  ISkillServiceRenderData,
} from "../SkillService/SkillService";
import { CHARACTER_PL } from "../TRANSLATE_PL/CATEGORIES/CHARACTER_PL";

export interface ICharacterRenderData {
  pawnService: IPawnServiceRenderData;
  name: CharacterName;
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
  name: CharacterName;
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

export type CharacterName =
  | "explorer"
  | "carpenter"
  | "cook"
  | "soldier"
  | "dog"
  | "friday";

export type Gender = "male" | "female";
