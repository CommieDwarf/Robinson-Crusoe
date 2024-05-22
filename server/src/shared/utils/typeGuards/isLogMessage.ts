import {ILogMessageRenderData} from "@shared/types/Game/ChatLog/LogMessage";
import {IChatMessageRenderData} from "@shared/types/ChatService/ChatService";


export function isLogMessage(candidate: ILogMessageRenderData | IChatMessageRenderData): candidate is ILogMessageRenderData {
    return "color" in candidate;
}
