export interface IChatService {
    messages: IChatMessage[],
    addMsg: (author: string, content: string) => void;
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

export interface IChatMessageRenderData {
    timestamp: number,
    author: string,
    content: string,
}

