import { CharacterName, ICharacter } from "./Character";
import { PlayerCharacterName } from "./PlayerCharacter";
import { IDictionary } from "../IDictionary";
import { ISkill } from "./Skill";

export type SideCharacterName = Exclude<CharacterName, PlayerCharacterName>;

export interface ISideCharacter extends ICharacter {
  name: SideCharacterName;
  skills: IDictionary<ISkill>;
}
