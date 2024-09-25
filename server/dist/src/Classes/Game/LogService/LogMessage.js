"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMessage = void 0;
class LogMessage {
    constructor(content, color, round, phase, source = "") {
        this._content = content;
        this._color = color;
        this._turn = round;
        this._phase = phase;
        this._source = source;
    }
    get renderData() {
        return {
            content: this._content,
            color: this._color,
            round: this._turn,
            phase: this._phase,
            source: this._source,
        };
    }
    get source() {
        return this._source;
    }
    get round() {
        return this._turn;
    }
    get phase() {
        return this._phase;
    }
    get content() {
        return this._content;
    }
    get color() {
        return this._color;
    }
}
exports.LogMessage = LogMessage;
//# sourceMappingURL=LogMessage.js.map