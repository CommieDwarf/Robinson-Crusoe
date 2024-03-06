import {
    ILogMessage,
    ILogMessageRenderData,
    LogColor,
    LogContent,
} from "@shared/types/Game/ChatLog/LogMessage";
import {Phase} from "@shared/types/Game/PhaseService/PhaseService";

export class LogMessage implements ILogMessage {


    private readonly _content: LogContent;
    private readonly _color: LogColor;
    private readonly _turn: number;
    private readonly _phase: Phase;
    private readonly _source: string;

    constructor(
        content: LogContent,
        color: LogColor,
        round: number,
        phase: Phase,
        source = ""
    ) {
        this._content = content;
        this._color = color;
        this._turn = round;
        this._phase = phase;
        this._source = source;
    }

    get renderData(): ILogMessageRenderData {
        return {
            content: this._content,
            color: this._color,
            round: this._turn,
            phase: this._phase,
            source: this._source,
        };
    }

    get source(): string {
        return this._source;
    }

    get round(): number {
        return this._turn;
    }

    get phase(): Phase {
        return this._phase;
    }

    get content(): LogContent {
        return this._content;
    }

    get color(): LogColor {
        return this._color;
    }
}
