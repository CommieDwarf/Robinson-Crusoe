import { ICharEffects } from "./CharEffects";
import { IPawnsService } from "../Pawns/Pawns";
import { IPawnRenderData } from "../Pawns/Pawn";

export interface ICharacterRenderData {
  freePawns: IPawnRenderData[];
  name: CharacterName;
  namePL: CHAR_NAME_TRANSLATION;
  id: number;
  health: number;
  currentHealth: number;
  gender: string;
}

export interface ICharacter {
  pawns: IPawnsService;
  name: CharacterName;
  id: number;
  health: number;
  effects: ICharEffects;
  namePL: CHAR_NAME_TRANSLATION;
  currentHealth: number;
  gender: string;
  renderData: ICharacterRenderData;
  determination: number | null;

  incrementDetermination: (by: number) => void;
  decrementDetermination: (by: number) => void;
  getHurt: (by: number) => void;
  getHealed: (by: number) => void;
}

export type CharacterName =
  | "explorer"
  | "carpenter"
  | "cook"
  | "soldier"
  | "dog"
  | "friday";

export enum CHAR_NAME_TRANSLATION {
  explorer = "kucharz",
  carpenter = "cieśla",
  cook = "kucharz",
  soldier = "żołnierz",
  dog = "pies",
  friday = "piętaszek",
}
