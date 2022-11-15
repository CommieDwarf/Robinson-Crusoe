import { IPlayer } from "../PlayerService/Player";
import { CharacterName, ICharacter, ICharacterRenderData } from "./Character";
import { IDictionary } from "../IDictionary";
import { ISkill } from "./Skill";
import { IPawnRenderData } from "../Pawns/Pawn";

export type PlayerCharacterName = Exclude<CharacterName, "dog" | "friday">;

export interface IPlayerCharacterRenderData extends ICharacterRenderData {
  playerId: number;
  name: PlayerCharacterName;
  gender: "male" | "female";
  moraleThresholds: number[];
  skills: IDictionary<ISkill>;
  freePawns: IPawnRenderData[];
}

export interface IPlayerCharacter extends ICharacter {
  player: IPlayer;
  name: PlayerCharacterName;
  gender: "male" | "female";
  moraleThresholds: number[];
  skills: IDictionary<ISkill>;
  renderData: IPlayerCharacterRenderData;
  shouldMoraleDrop: boolean;
}
