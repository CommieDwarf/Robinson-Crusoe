import {SESSION_JOIN_ERROR_CODE} from "@shared/types/Errors/SESSION_JOIN_ERROR_CODE";

export class SessionConnectError extends Error {
    private readonly _code: SESSION_JOIN_ERROR_CODE;

    constructor(message: string, code: SESSION_JOIN_ERROR_CODE) {
        super(message);
        this._code = code;
    }

    get code() {
        return this._code;
    }
}
