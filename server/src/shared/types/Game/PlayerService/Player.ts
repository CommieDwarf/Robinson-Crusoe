import {IPlayerCharacter, IPlayerCharacterRenderData,} from "../Characters/PlayerCharacter";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";
import {IUser} from "../../User/IUser";
import {CHARACTER, Gender} from "@shared/types/Game/Characters/Character";
import {IGame} from "@shared/types/Game/Game";
import {UserPlaceHolder} from "../../../../Classes/Player/Player";


export interface AssignedCharacter {
    char: CHARACTER,
    gender: Gender
}


export interface IPlayer {
    getCharacter: () => IPlayerCharacter;

    username: string;
    id: string;
    color: PLAYER_COLOR;
    assignCharacter: (character: AssignedCharacter) => void;
    assignedCharacter: AssignedCharacter;
    assignColor: (color: PLAYER_COLOR) => void;
    initCharacter: (game: IGame) => void;
    user: IUser | UserPlaceHolder;
    isPlaceHolder: boolean;

    setUser: (user: IUser) => void;
    unsetUser: () => void;

    ready: boolean;
    prime: boolean;
    renderData: IPlayerRenderData;
    saveData: IPlayerSaveData;
}


export interface IPlayerRenderData {
    username: string;
    color: PLAYER_COLOR;
    character: IPlayerCharacterRenderData | null;
    assignedCharacter: AssignedCharacter;
    isPlaceHolder: boolean;
    prime: boolean;
    ready: boolean;
    id: string;
}

export interface IPlayerSaveData {
    userId: string;
    username: string,
    color: PLAYER_COLOR,
    assignedCharacter: AssignedCharacter,
}
