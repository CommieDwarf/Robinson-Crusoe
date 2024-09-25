"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const LogMessage_1 = require("./LogMessage");
class LogService {
    constructor(game) {
        this.messages = [];
        this.history = [];
        this._game = game;
    }
    get renderData() {
        return this.messages.map((msg) => msg.renderData);
    }
    addMessage(content, color, source) {
        this.messages.push(new LogMessage_1.LogMessage(content, color, this._game.round, this._game.phaseService.phase, source));
    }
    clearMessages() {
        this.history.concat(this.messages);
        this.messages = [];
    }
}
exports.LogService = LogService;
//# sourceMappingURL=LogService.js.map