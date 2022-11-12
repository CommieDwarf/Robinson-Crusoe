import { IWeather } from "../../../interfaces/Weather/Weather";

export class Weather implements IWeather {
  private _rainCloud = false;
  private _snowCloud = false;
  private _hungryAnimals = false;

  get rainCloud(): boolean {
    return this._rainCloud;
  }

  set rainCloud(value: boolean) {
    this._rainCloud = value;
  }

  get snowCloud(): boolean {
    return this._snowCloud;
  }

  set snowCloud(value: boolean) {
    this._snowCloud = value;
  }

  get hungryAnimals(): boolean {
    return this._hungryAnimals;
  }

  set hungryAnimals(value: boolean) {
    this._hungryAnimals = value;
  }
}
