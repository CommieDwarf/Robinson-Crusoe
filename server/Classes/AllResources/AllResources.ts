import { Resources } from "./Resources";
import { IResources } from "../../../interfaces/Resources";

export default class AllResources {
  get future(): Resources {
    return this._future;
  }

  get owned(): Resources {
    return this._owned;
  }

  private _future: Resources = new Resources();
  private _owned: Resources = new Resources();

  public addFutureToOwned = (): void => {
    this._owned.addToAllResources(this.future);
    this._future.resetResources();
  };

  public recoverResources = (resources: IResources): void => {
    this._owned.addToAllResources(resources);
  };
}
