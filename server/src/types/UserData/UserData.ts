import {SessionData} from "../Session/Session";

export interface UserData {
    id: string,
    username: string,

    session: SessionData | null;
    setSession: (session: SessionData) => void;
}
