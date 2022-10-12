import { Phase } from "../PhaseService/PhaseService";

export type LogColor = "green" | "red" | "neutral";

export interface ILogMessageRenderData {
  message: string;
  source: string;
  color: LogColor;
  turn: number;
  phase: Phase;
}

export interface ILogMessage {
  message: string;
  source: string;
  color: LogColor;
  turn: number;
  phase: Phase;
  renderData: ILogMessageRenderData;
}
