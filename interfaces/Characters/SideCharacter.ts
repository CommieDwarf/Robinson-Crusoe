import { ICharacter } from "./Character";

export type SideCharacterName = "friday" | "dog";

export interface ISideCharacter extends ICharacter {
  name: SideCharacterName;
}
