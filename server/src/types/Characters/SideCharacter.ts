import {CHARACTER, ICharacter, ICharacterRenderData} from "./Character";
import {PlayerCharacterName} from "./PlayerCharacter";
import {PawnOwner} from "../PawnOwner/PawnOwner";

export type SideCharacterName = Exclude<CHARACTER, PlayerCharacterName>;

export interface ISideCharacterRenderData extends ICharacterRenderData {
    name: SideCharacterName;
}

export interface ISideCharacter extends ICharacter, PawnOwner<ISideCharacterRenderData> {
    name: SideCharacterName;
    renderData: ISideCharacterRenderData;
}
