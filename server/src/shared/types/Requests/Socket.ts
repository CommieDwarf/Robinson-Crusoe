import {IGame, IGameRenderData} from "@shared/types/Game/Game";
import {CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {SessionSettings} from "@shared/types/SessionSettings";

export interface GameInstanceSentPayload {
    gameSessionId: string;
    gameRenderData: IGameRenderData;
}


export interface ExecuteGameMethodAndSendResponsePayload {
    userId: string,
    methodName: keyof IGame,
    methodArgs: any[]
}

export interface PlayerActionPayload {
    userId: string
    actionType: CONTROLLER_ACTION,
    arguments: any[],
}


export interface IsGameInProgressResponsePayload {
    value: boolean;
}

export interface CreateGamePayload {
    settings: SessionSettings;
}
