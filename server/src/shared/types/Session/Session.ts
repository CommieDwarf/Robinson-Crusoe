import {IUser} from "../User/IUser";
import {AssignedCharacter, IPlayer, IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {PLAYER_COLOR} from "@shared/types/Game/PLAYER_COLOR";
import {BaseController} from "../../../types/GameController/Controllers";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {GAME_STATUS, IGame, IGameRenderData} from "@shared/types/Game/Game";
import {SessionSettings} from "@shared/types/SessionSettings";
import {IChatServiceRenderData} from "@shared/types/ChatService/ChatService";
import { Document } from "mongoose";
import { SaveGameDocument } from "../../../Models/SaveGame";


// public changeCharacter(userId: string, character: CHARACTER) {
//     const player = this.getPlayerById(userId)
//     player.assignCharacter({
//         char: character,
//         gender: player.assignedCharacter.gender,
//     })
// }
//
// public changeGender(userId: string, gender: Gender) {

export interface SessionData {
    players: IPlayer[];
    host: IUser;
    id: string;

    gameStatus: GAME_STATUS;

    isGameInProgress: boolean;
    settings: SessionSettings;
    isLoadMode: boolean;
    gameController: BaseController | null;
    usersInSession: number;
    invitationCode: string;
    visible: boolean;


    joinSession: (user: IUser, load: boolean) => void;
    leaveSession: (user: IUser) => void;
    startGame: () => BaseController;
    assignColor: (userId: string, color: PLAYER_COLOR) => void;
    handleAction: (userId: string, action: CONTROLLER_ACTION, ...args: any[]) => void;
    getGame: () => IGame | undefined;
    getPlayerByUserId: (userId: string) => IPlayer
    onSessionRemove: () => void;


    canStart: () => boolean;

    isHost: (userId: string) => boolean;

    kickPlayer: (playerId: string) => void;

    isUserInSession: (userId: string) => boolean;

    changeCharacter: (userId: string, character: Partial<AssignedCharacter>) => void;

    updateSettings: (settings: Partial<SessionSettings>) => void;

    addMessage: (userId: string, message: string) => void;
    setPlayerReady: (userId: string, ready: boolean) => void;

    getBasicInfo: () => SessionBasicInfo;
    usersPlayerExist: (userId: string) => boolean;

    save: () => Promise<(Document<unknown, {}, SaveGameDocument> & SaveGameDocument & Required<{
        _id: string;
    }>) | undefined>;

    getRenderData: (userId: string) => SessionRenderData
}

export interface SessionRenderData {
    id: string;
    invitationCode: string;
    settings: SessionSettings;
    players: IPlayerRenderData[];
    game: IGameRenderData | null;
    localPlayer: IPlayerRenderData;
    hostPlayer: IPlayerRenderData;
    chatService: IChatServiceRenderData;
    loadMode: boolean;
}

export interface SessionBasicInfo {
    id: string;
    name: string,
    host: string,
    players: number,
    maxPlayers: number,
    scenario: string,
    password: boolean;
    usersInSession: number,
}
