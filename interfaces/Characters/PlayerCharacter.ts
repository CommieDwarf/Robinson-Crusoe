import { IPlayer } from "../Player";
import { CHAR_NAME_TRANSLATION, CharacterName, ICharacter } from "./Character";
import { ISideCharacter } from "./SideCharacter";
import { PlayerCharEffects } from "../../server/Classes/Characters/CharEffects";
import { ICharEffects } from "./CharEffects";
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
