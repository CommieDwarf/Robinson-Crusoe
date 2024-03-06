import {UserData} from "../UserData/UserData";
import {SessionData} from "../Session/Session";

export interface ISessionService {
    createSession: (user: UserData) => SessionData;
    getSession: (id: string) => SessionData;
    closeSession: (sessionId: string) => void;

}
