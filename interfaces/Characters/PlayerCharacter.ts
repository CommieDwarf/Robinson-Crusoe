import { IPlayer } from "../PlayerService/Player";
import { CharacterName, ICharacter, ICharacterRenderData } from "./Character";
import { IDictionary } from "../IDictionary";
import { ISkill } from "../SkillService/Skill";
import { IPawnRenderData } from "../Pawns/Pawn";

export type PlayerCharacterName = Exclude<CharacterName, "dog" | "friday">;

export interface IPlayerCharacterRenderData extends ICharacterRenderData {
  playerId: number;
  name: PlayerCharacterName;
  moraleThresholds: number[];
}

export interface IPlayerCharacter extends ICharacter {
  player: IPlayer;
  name: PlayerCharacterName;
  moraleThresholds: number[];
  renderData: IPlayerCharacterRenderData;
  shouldMoraleDrop: boolean;
}
