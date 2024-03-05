import {ILogMessage, ILogMessageRenderData, LogColor,} from "../../types/ChatLog/LogMessage";
import {Phase} from "../../types/PhaseService/PhaseService";

export class LogMessage implements ILogMessage {
  get renderData(): ILogMessageRenderData {
    return {
      message: this._message,
      color: this._color,
      round: this._turn,
      phase: this._phase,
      source: this._source,
    };
  }

  private readonly _message: string;
  private readonly _color: LogColor;
  private readonly _turn: number;
  private readonly _phase: Phase;
  private readonly _source: string;

  constructor(
    message: string,
    color: LogColor,
    round: number,
    phase: Phase,
    source = ""
  ) {
    this._message = message;
    this._color = color;
    this._turn = round;
    this._phase = phase;
    this._source = source;
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

  get message(): string {
    return this._message;
  }

  get color(): LogColor {
    return this._color;
  }
}
