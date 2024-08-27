import {Session} from "./Session";

export class SaveService {


    private readonly _session: Session


    constructor(session: Session) {
        this._session = session
    }
}
