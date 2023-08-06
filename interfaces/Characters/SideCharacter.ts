import {CHARACTER, ICharacterRenderData, ICharacter} from "./Character";
import {PlayerCharacterName} from "./PlayerCharacter";

export type SideCharacterName = Exclude<CHARACTER, PlayerCharacterName>;

export interface ISideCharacterRenderData extends ICharacterRenderData {
    name: SideCharacterName;
}

export interface ISideCharacter extends ICharacter {
    name: SideCharacterName;
    renderData: ISideCharacterRenderData;
}
