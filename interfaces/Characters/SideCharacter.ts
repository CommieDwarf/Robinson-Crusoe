import { CharacterName, ICharacter } from "./Character";
import { PlayableCharacterName } from "./PlayerCharacter";

export type SideCharacterName = Exclude<CharacterName, PlayableCharacterName>;

export interface ISideCharacter extends ICharacter {
  name: SideCharacterName;
}
