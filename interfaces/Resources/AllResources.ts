import { IResources, IResourcesAmount } from "./Resources";

export interface IAllResourcesRenderData {
  future: IResourcesAmount;
  owned: IResourcesAmount;
}

export interface IAllResources {
  future: IResources;
  owned: IResources;
  addFutureToOwned: () => void;
  addToOwned: (resources: IResources) => void;

  renderData: IAllResourcesRenderData;
}
