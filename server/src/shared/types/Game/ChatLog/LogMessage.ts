import {Phase} from "../PhaseService/PhaseService";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";

export type LogColor = "positive" | "negative" | "neutral";


export interface ILogMessage {
    content: LogContent,
    source: string;
    color: LogColor;
    round: number;
    phase: Phase;
    renderData: ILogMessageRenderData;
}

export interface ILogMessageRenderData {
    content: LogContent,
    source: string;
    color: LogColor;
    round: number;
    phase: Phase;
}

export interface LogContent {
    code: LOG_CODE,
    amount: number,
    subject1: string,
    subject2: string,
}
