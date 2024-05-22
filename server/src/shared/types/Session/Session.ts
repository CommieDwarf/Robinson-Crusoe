import {IUser} from "../../../types/UserData/IUser";
import {AssignedCharacter, IPlayer, IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {BaseController} from "../../../types/GameController/Controllers";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {IGame, IGameRenderData} from "@shared/types/Game/Game";
import {SessionSettings} from "@shared/types/SessionSettings";
import {IChatServiceRenderData} from "@shared/types/ChatService/ChatService";


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

    isGameInProgress: boolean;
    settings: SessionSettings;
    joinSession: (user: IUser) => void;
    leaveSession: (player: IPlayer | IUser) => void;
    startGame: () => BaseController;
    assignColor: (userId: string, color: PAWN_COLOR) => void;
    handleAction: (userId: string, action: CONTROLLER_ACTION, ...args: any[]) => void;
    gameController: BaseController | null;
    getGame: () => IGame | undefined;


    addMessage: (userId: string, message: string) => void;
    setPlayerReady: (userId: string, ready: boolean) => void;

    kickPlayer: (playerId: string) => void;

    isUserInSession: (userId: string) => boolean;

    changeCharacter: (userId: string, character: Partial<AssignedCharacter>) => void;

    getBasicInfo: () => SessionBasicInfo;

    getRenderData: (userId: string) => SessionRenderData
}

export interface SessionRenderData {
    id: string;
    connectCode: string;
    settings: SessionSettings;
    players: IPlayerRenderData[];
    // host: IPlayerRenderData;
    game: IGameRenderData | null;
    localPlayer: IPlayerRenderData;
    hostPlayer: IPlayerRenderData;
    chatService: IChatServiceRenderData;
}

export interface SessionBasicInfo {
    id: string;
    name: string,
    host: string,
    players: number,
    maxPlayers: number,
    scenario: string,
    password: boolean;
}
