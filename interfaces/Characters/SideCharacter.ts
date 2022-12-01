import { CharacterName, ICharacter, ICharacterRenderData } from "./Character";
import { PlayerCharacterName } from "./PlayerCharacter";
import { IDictionary } from "../IDictionary";
import { ISkill } from "../SkillService/Skill";

export type SideCharacterName = Exclude<CharacterName, PlayerCharacterName>;

export interface ISideCharacterRenderData extends ICharacterRenderData {
  name: SideCharacterName;
}

export interface ISideCharacter extends ICharacter {
  name: SideCharacterName;
  renderData: ISideCharacterRenderData;
}
