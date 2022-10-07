import { ACTION_TYPE, IAction } from "../../../interfaces/ActionService/Action";

export class Action implements IAction {
  get type(): ACTION_TYPE {
    return this._type;
  }

  get eventToken(): boolean {
    return this._eventToken;
  }

  set eventToken(value: boolean) {
    this._eventToken = value;
  }

  get reRollToken(): boolean {
    return this._reRollToken;
  }

  set reRollToken(value: boolean) {
    this._reRollToken = value;
  }

  get additionalPawnRequired(): boolean {
    return this._additionalPawnRequired;
  }

  set additionalPawnRequired(value: boolean) {
    this._additionalPawnRequired = value;
  }

  private readonly _type: ACTION_TYPE;
  private _eventToken = false;
  private _reRollToken = false;
  private _additionalPawnRequired = false;

  constructor(type: ACTION_TYPE) {
    this._type = type;
  }
}
