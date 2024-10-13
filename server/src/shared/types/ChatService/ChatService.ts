export interface IChatService {
    messages: IChatMessage[],
    addMsg: (author: string, content: string) => void;

    addSystemMsg: (code: SYSTEM_MSG, subject1: string) => void;

    clearSystemMessages: () => void;
    renderData: IChatServiceRenderData;

}

export interface IChatServiceRenderData {
    messages: IChatMessageRenderData[];
}

export interface IChatMessage {
    date: Date,
    author: string,
    content: string,
}


export interface IChatMessageRenderData extends Omit<IChatMessage, "date"> {
    timestamp: number,
    author: string,
    content: string,
}

export interface SystemMessage extends IChatMessage {
    author: "system";
    content: SYSTEM_MSG,
    subject1: string,
}

export interface SystemMessageRenderData extends Omit<SystemMessage, "date"> {
    timestamp: number
}

export enum SYSTEM_MSG {
    PLAYER_HAS_JOINED_SESSION = "player has joined session",
    PLAYER_HAS_LEFT_SESSION = "player has left session",
    ONLY_PRESENT_PLAYERS_CAN_JOIN = "only present players can join",
    GAME_RESTARTED = "game restarted",
    GAME_TERMINATED = "game terminated",
}
