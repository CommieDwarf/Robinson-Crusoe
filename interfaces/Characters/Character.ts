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

type ICharacterRenderDataNoPawns = Omit<ICharacterRenderData, "freePawns">;

export interface ICharacter {
  pawnService: IPawnsService;
  name: CharacterName;
  id: number;
  health: number;
  effects: ICharEffects;
  namePL: CHAR_NAME_TRANSLATION;
  currentHealth: number;
  gender: string;
  renderData: ICharacterRenderData;
  determination: number | null;

  incrementDetermination: (by: number, logSource?: string) => void;
  decrementDetermination: (by: number, logSource?: string) => void;
  getHurt: (by: number, logSource?: string) => void;
  getHealed: (by: number, logSource?: string) => void;
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
