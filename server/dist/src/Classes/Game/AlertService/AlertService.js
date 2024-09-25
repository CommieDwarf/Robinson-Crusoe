"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertService = void 0;
class AlertService {
    constructor() {
        this._alert = "";
    }
    get renderData() {
        return {
            alert: this._alert,
        };
    }
    get alert() {
        return this._alert;
    }
    setAlert(message) {
        this._alert = message;
    }
    clearAlert() {
        this._alert = "";
    }
}
exports.AlertService = AlertService;
//# sourceMappingURL=AlertService.js.map