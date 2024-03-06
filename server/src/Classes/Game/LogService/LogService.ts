import {ILogService} from "@shared/types/Game/ChatLog/ChatLog";
import {ILogMessage, LogColor, LogContent} from "@shared/types/Game/ChatLog/LogMessage";
import {LogMessage} from "./LogMessage";
import {IGame} from "@shared/types/Game/Game";

export class LogService implements ILogService {
    messages: ILogMessage[] = [];
    history: ILogMessage[] = [];
    private readonly _game: IGame;

    constructor(game: IGame) {
        this._game = game;
    }

    get renderData() {
        return this.messages.map((msg) => msg.renderData);
    }

    addMessage(content: LogContent, color: LogColor, source: string) {
        this.messages.push(
            new LogMessage(
                content,
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
