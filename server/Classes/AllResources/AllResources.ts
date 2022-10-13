import { Resources } from "./Resources";
import {
  IResources,
  IResourcesAmount,
} from "../../../interfaces/Resources/Resources";
import {
  IAllResources,
  IAllResourcesRenderData,
} from "../../../interfaces/Resources/AllResources";

export class AllResources implements IAllResources {
  get productionBlocked(): boolean {
    return this._blockedProduction;
  }

  set productionBlocked(value: boolean) {
    this._blockedProduction = value;
  }

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
  private _blockedProduction = false;

  public addFutureToOwned = (): void => {
    this._owned.addToAllResources(this.future);
    this._future.resetResources();
  };

  public addToOwned = (resources: IResources): void => {
    this._owned.addToAllResources(resources);
  };

  public addResourceToOwned(resource: keyof IResourcesAmount, amount: number) {
    this._owned.addResource(resource, amount);
  }

  public addResourceToFuture(resource: keyof IResourcesAmount, amount: number) {
    this._future.addResource(resource, amount);
  }
}
