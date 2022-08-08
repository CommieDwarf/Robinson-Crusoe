import { ICharEffects } from "./CharEffects";
import { IPawns } from "../Pawns/Pawns";

export interface ICharacter {
  pawns: IPawns;
  name: string;
  id: number;
  health: number;
  effects: ICharEffects;
  namePL: CHAR_NAME_TRANSLATION;
  currentHealth: number;
  gender: string;
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
