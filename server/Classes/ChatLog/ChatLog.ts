import { IChatLog } from "../../../interfaces/ChatLog/ChatLog";
import { ILogMessage, LogColor } from "../../../interfaces/ChatLog/LogMessage";
import { Phase } from "../../../interfaces/PhaseService/PhaseService";
import { LogMessage } from "./LogMessage";
import { IGame } from "../../../interfaces/Game";

export class ChatLog implements IChatLog {
  messages: ILogMessage[] = [];
  history: ILogMessage[] = [];
  private readonly _game: IGame;

  constructor(game: IGame) {
    this._game = game;
  }

  get renderData() {
    return this.messages.map((msg) => msg.renderData);
  }

  addMessage(message: string, color: LogColor, source: string) {
    this.messages.push(
      new LogMessage(
        message,
        color,
        this._game.round,
        this._game.phaseService.phase,
        source
      )
    );
  }

  clearMessages(): void {
    this.history.concat(this.messages);
    this.messages = [];
  }
}
