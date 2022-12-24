import { IResources, IResourcesAmount } from "./Resources";
import { ICharacter } from "../Characters/Character";

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
  addResourceToOwned: (
    resource: keyof IResourcesAmount,
    amount: number,
    logSource: string
  ) => void;
  addResourceToFuture: (
    resource: keyof IResourcesAmount,
    amount: number,
    logSource: string
  ) => void;
  productionBlocked: boolean;
  canOwnedAfford: (resources: IResources) => boolean;
  spendFromOwned: (
    resource: keyof IResourcesAmount,
    amount: number,
    logSource: string
  ) => void;
  spendOrSuffer: (
    resource: keyof IResourcesAmount,
    amount: number,
    logSource: string
  ) => void;
}
