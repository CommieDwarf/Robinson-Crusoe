import { ILogMessage, ILogMessageRenderData, LogColor } from "./LogMessage";
import { Phase } from "../PhaseService/PhaseService";

export interface IChatLog {
  messages: ILogMessage[];
  addMessage: (message: string, color: LogColor, source: string) => void;
  clearMessages: () => void;

  renderData: ILogMessageRenderData[];
}
