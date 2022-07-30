import { IPawn } from "../Pawn";

export interface ICharacter {
  pawns: IPawn[];
  freePawns: IPawn[];
  name: string;
}

export enum CHAR_NAME_TRANSLATION {
  explorer = "kucharz",
  carpenter = "cieśla",
  cook = "kucharz",
  soldier = "żołnierz",
  dog = "pies",
  friday = "piętaszek",
}
