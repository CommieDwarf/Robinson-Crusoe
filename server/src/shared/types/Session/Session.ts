import {IUser} from "../../../types/UserData/IUser";
import {IPlayer, IPlayerRenderData} from "@shared/types/Game/PlayerService/Player";
import {PAWN_COLOR} from "@shared/types/Game/PAWN_COLOR";
import {BaseController} from "../../../types/GameController/Controllers";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {IGame, IGameRenderData} from "@shared/types/Game/Game";
import {SessionSettings} from "@shared/types/SessionSettings";


export interface SessionData {
    players: IPlayer[];
    host: IPlayer;
    id: string;
    settings: SessionSettings;
    joinSession: (user: IPlayer) => void;
    leaveSession: (user: IPlayer) => void;
    startGame: () => BaseController;
    assignColor: (userId: string, color: PAWN_COLOR) => void;
    handleAction: (userId: string, action: CONTROLLER_ACTION, ...args: any[]) => void;
    gameController: BaseController | null;
    getGame: () => IGame | undefined;

    getBasicInfo: () => SessionBasicInfo;

    renderData: SessionRenderData
}

export interface SessionRenderData {
    id: string;
    connectCode: string;
    settings: SessionSettings;
    players: IPlayerRenderData[];
    host: IPlayerRenderData;
    game: IGameRenderData | null;
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
