import { IPlayer } from "../Player";
import { CharacterName, ICharacter } from "./Character";
import { IDictionary } from "../IDictionary";
import { ISkill } from "./Skill";

export type PlayerCharacterName = Exclude<CharacterName, "dog" | "friday">;

export interface IPlayerCharacter extends ICharacter {
  player: IPlayer;
  name: PlayerCharacterName;
  gender: "male" | "female";
  moraleThresholds: number[];
  skills: IDictionary<ISkill>;
}
