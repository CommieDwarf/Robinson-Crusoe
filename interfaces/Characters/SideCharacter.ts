import { CharacterName, ICharacter, ICharacterRenderData } from "./Character";
import { PlayerCharacterName } from "./PlayerCharacter";
import { IDictionary } from "../IDictionary";
import { ISkill } from "./Skill";

export type SideCharacterName = Exclude<CharacterName, PlayerCharacterName>;

export interface ISideCharacterRenderData extends ICharacterRenderData {
  name: SideCharacterName;
  skills: IDictionary<ISkill>;
}

export interface ISideCharacter extends ICharacter {
  name: SideCharacterName;
  skills: IDictionary<ISkill>;
  renderData: ISideCharacterRenderData;
}
