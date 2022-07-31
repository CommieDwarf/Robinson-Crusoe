import { IPlayer } from "../Player";
import { CHAR_NAME_TRANSLATION, CharacterName, ICharacter } from "./Character";
import { IDictionary } from "../IDictionary";
import { ISkill } from "./Skill";

export type PlayableCharacterName = Exclude<CharacterName, "dog" | "friday">;

export interface IPlayerCharacter extends ICharacter {
  player: IPlayer;
  name: PlayableCharacterName;
  gender: "male" | "female";
  moraleThresholds: number[];
  skills: IDictionary<ISkill>;
}
