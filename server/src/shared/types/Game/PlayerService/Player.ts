import {IPlayerCharacter, IPlayerCharacterRenderData,} from "../Characters/PlayerCharacter";
import {UserData} from "@shared/types/UserData/UserData";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";


export interface IPlayer {
    username: string;
    getCharacter: () => IPlayerCharacter;
    setCharacter: (character: IPlayerCharacter) => void;
    id: number;
    color: string | null;

    assignColor: (color: PAWN_COLOR) => void;

    user: UserData;
    renderData: IPlayerRenderData;
}


export interface IPlayerRenderData {
    username: string;
    color: string;
    character: IPlayerCharacterRenderData;
    id: number;
}
