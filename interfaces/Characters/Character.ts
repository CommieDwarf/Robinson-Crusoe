import { ICharEffects } from "./CharEffects";
import { IPawnsService } from "../Pawns/Pawns";
import { IPawnRenderData } from "../Pawns/Pawn";

export interface ICharacterRenderData {
  freePawns: IPawnRenderData[];
  name: CharacterName;
  namePL: CHAR_NAME_TRANSLATION;
  id: number;
  health: number;
  maxHealth: number;
  gender: string;
  determination: number;
}

type ICharacterRenderDataNoPawns = Omit<ICharacterRenderData, "freePawns">;

export interface ICharacter {
  pawnService: IPawnsService;
  name: CharacterName;
  id: number;
  maxHealth: number;
  effects: ICharEffects;
  namePL: CHAR_NAME_TRANSLATION;
  health: number;
  gender: string;
  renderData: ICharacterRenderData;
  determination: number;

  incrementDetermination: (by: number) => void;
  decrementDetermination: (by: number) => void;
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

export enum CHAR_NAME_TRANSLATION {
  explorer = "kucharz",
  carpenter = "cieśla",
  cook = "kucharz",
  soldier = "żołnierz",
  dog = "pies",
  friday = "piętaszek",
}
