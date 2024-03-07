import {IPlayerCharacter, IPlayerCharacterRenderData,} from "../Characters/PlayerCharacter";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {UserData} from "../../../../types/UserData/UserData";
import {CHARACTER} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";


export interface IPlayer {
    username: string;
    getCharacter: () => IPlayerCharacter;
    id: number;
    color: string | null;

    assignCharacter: (character: CHARACTER) => void;

    assignColor: (color: PAWN_COLOR) => void;
    initCharacter: (game: IGame) => void;

    user: UserData;
    renderData: IPlayerRenderData;
}


export interface IPlayerRenderData {
    username: string;
    color: string;
    character: IPlayerCharacterRenderData;
    id: number;
}
