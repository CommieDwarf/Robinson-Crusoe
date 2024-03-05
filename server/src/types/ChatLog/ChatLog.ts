import {ILogMessage, ILogMessageRenderData, LogColor} from "./LogMessage";

export interface IChatLog {
  messages: ILogMessage[];
  addMessage: (message: string, color: LogColor, source: string) => void;
  clearMessages: () => void;

  renderData: ILogMessageRenderData[];
}
