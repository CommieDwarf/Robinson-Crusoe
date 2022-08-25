import { Resources } from "./Resources";
import { IResources } from "../../../interfaces/Resources/Resources";
import {
  IAllResources,
  IAllResourcesRenderData,
} from "../../../interfaces/Resources/AllResources";

export class AllResources implements IAllResources {
  get future(): IResources {
    return this._future;
  }

  get owned(): IResources {
    return this._owned;
  }

  get renderData(): IAllResourcesRenderData {
    return {
      future: this.future.renderData,
      owned: this.owned.renderData,
    };
  }

  private _future: IResources = new Resources();
  private _owned: IResources = new Resources();

  public addFutureToOwned = (): void => {
    this._owned.addToAllResources(this.future);
    this._future.resetResources();
  };

  public addToOwned = (resources: IResources): void => {
    this._owned.addToAllResources(resources);
  };
}
