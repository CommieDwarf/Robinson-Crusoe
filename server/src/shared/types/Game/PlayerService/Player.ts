import {IPlayerCharacter, IPlayerCharacterRenderData,} from "../Characters/PlayerCharacter";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {IUser} from "../../../../types/UserData/IUser";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";
import {SessionData} from "../../Session/Session";


export interface AssignedCharacter {
    char: CHARACTER,
    gender: Gender
}


export interface IPlayer {
    username: string;
    getCharacter: () => IPlayerCharacter;
    id: string;
    color: string | null;
    assignCharacter: (character: AssignedCharacter) => void;
    assignedCharacter: AssignedCharacter;
    assignColor: (color: PAWN_COLOR) => void;
    initCharacter: (game: IGame) => void;
    user: IUser;
    renderData: IPlayerRenderData;
}


export interface IPlayerRenderData {
    username: string;
    color: string;
    character: IPlayerCharacterRenderData | null;
    assignedCharacter: AssignedCharacter;
    id: string;
}
