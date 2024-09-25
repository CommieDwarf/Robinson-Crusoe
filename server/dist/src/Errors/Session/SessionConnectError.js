"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionConnectError = void 0;
class SessionConnectError extends Error {
    constructor(message, code) {
        super(message);
        this._code = code;
    }
    get code() {
        return this._code;
    }
}
exports.SessionConnectError = SessionConnectError;
//# sourceMappingURL=SessionConnectError.js.map