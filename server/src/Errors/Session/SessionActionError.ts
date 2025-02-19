import { SESSION_CONNECTION_ERROR_CODE } from "@shared/types/Errors/SESSION_CONNECTION_ERROR_CODE";

export enum SESSION_CANT_START_ERROR_CODE {}

export class SessionConnectError extends Error {
	private readonly _code: SESSION_CONNECTION_ERROR_CODE;

	constructor(message: string, code: SESSION_CONNECTION_ERROR_CODE) {
		super(message);
		this._code = code;
	}

	get code() {
		return this._code;
	}
}
