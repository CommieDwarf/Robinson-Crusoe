import {ALERT_CODE} from "@shared/types/ALERT_CODE";


export class ForbiddenPlayerAction extends Error {
    declare message: ALERT_CODE;

    constructor(message: ALERT_CODE) {
        super(message);
    }
}
