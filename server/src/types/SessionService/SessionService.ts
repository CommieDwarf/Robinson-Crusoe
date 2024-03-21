import {IUser} from "../UserData/IUser";
import {GAME_SESSION_MODE, SessionData} from "../Session/Session";

export interface ISessionService {
    createSession: (user: IUser, mode: GAME_SESSION_MODE) => SessionData;
    getSession: (id: string) => SessionData;
    closeSession: (sessionId: string) => void;

}
