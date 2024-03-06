import {IAlertService} from "@shared/types/Game/AlertService/AlertService";

export class AlertService implements IAlertService {
    private _alert: string = "";

    get renderData() {
        return {
            alert: this._alert,
        };
    }

    get alert(): string {
        return this._alert;
    }

    setAlert(message: string) {
        this._alert = message;
    }

    clearAlert() {
        this._alert = "";
    }
}
