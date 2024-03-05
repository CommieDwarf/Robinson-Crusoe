import {Phase} from "../PhaseService/PhaseService";

export type LogColor = "green" | "red" | "neutral";

export interface ILogMessageRenderData {
  message: string;
  source: string;
  color: LogColor;
  round: number;
  phase: Phase;
}

export interface ILogMessage {
  message: string;
  source: string;
  color: LogColor;
  round: number;
  phase: Phase;
  renderData: ILogMessageRenderData;
}
