import {IPlayerCharacter, IPlayerCharacterRenderData,} from "../Characters/PlayerCharacter";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";
import {IUser} from "../../../../types/UserData/IUser";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";


export interface AssignedCharacter {
    char: CHARACTER,
    gender: Gender
}


export interface IPlayer {
    username: string;
    getCharacter: () => IPlayerCharacter;
    id: string;
    color: PLAYER_COLOR;
    assignCharacter: (character: AssignedCharacter) => void;
    assignedCharacter: AssignedCharacter;
    assignColor: (color: PLAYER_COLOR) => void;
    initCharacter: (game: IGame) => void;
    user: IUser;

    ready: boolean;

    prime: boolean;
    renderData: IPlayerRenderData;
}


export interface IPlayerRenderData {
    username: string;
    color: PLAYER_COLOR;
    character: IPlayerCharacterRenderData | null;
    assignedCharacter: AssignedCharacter;
    prime: boolean;
    ready: boolean;
    id: string;
}
