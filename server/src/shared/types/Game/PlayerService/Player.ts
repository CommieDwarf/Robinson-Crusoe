import {IPlayerCharacter, IPlayerCharacterRenderData,} from "../Characters/PlayerCharacter";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {IUser} from "../../../../types/UserData/IUser";
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

    user: IUser;
    renderData: IPlayerRenderData;
}


export interface IPlayerRenderData {
    username: string;
    color: string;
    character: IPlayerCharacterRenderData;
    id: number;
}
