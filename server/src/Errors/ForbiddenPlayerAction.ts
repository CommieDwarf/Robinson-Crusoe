import {ALERT_CODE} from "@shared/types/ALERT_CODE";


export class ForbiddenPlayerAction extends Error {
    constructor(message: ALERT_CODE) {
        super(message);
    }
}
