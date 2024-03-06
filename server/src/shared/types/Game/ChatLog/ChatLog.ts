import {ILogMessage, ILogMessageRenderData, LogColor, LogContent} from "./LogMessage";

export interface ILogService {
    messages: ILogMessage[];
    addMessage: (content: LogContent, color: LogColor, source: string) => void;
    clearMessages: () => void;
    renderData: ILogMessageRenderData[];
}
