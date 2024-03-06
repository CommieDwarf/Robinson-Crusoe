import {UserData} from "../../types/UserData/UserData";
import {SessionData} from "../../types/Session/Session";


export class User implements UserData {

    private readonly _id: string;
    private _session: SessionData | null = null;
    private readonly _username: string;

    constructor(id: string, userName: string) {
        this._id = id;
        this._username = userName;
    }

    get id(): string {
        return this._id;
    }

    get session(): SessionData | null {
        return this._session;
    }

    get username(): string {
        return this._username;
    }


    setSession(session: SessionData): void {
        this._session = session;
    }

}
