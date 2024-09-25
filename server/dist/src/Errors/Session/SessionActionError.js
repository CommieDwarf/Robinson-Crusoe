"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionConnectError = exports.SESSION_CANT_START_ERROR_CODE = void 0;
var SESSION_CANT_START_ERROR_CODE;
(function (SESSION_CANT_START_ERROR_CODE) {
})(SESSION_CANT_START_ERROR_CODE || (exports.SESSION_CANT_START_ERROR_CODE = SESSION_CANT_START_ERROR_CODE = {}));
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
//# sourceMappingURL=SessionActionError.js.map