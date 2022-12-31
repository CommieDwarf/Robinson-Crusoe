import { IResources, IResourcesAmount } from "./Resources";

export interface IResourceServiceRenderData {
  future: IResourcesAmount;
  owned: IResourcesAmount;
}

export interface IResourceService {
  future: IResources;
  owned: IResources;
  addFutureToOwned: () => void;
  addToOwned: (resources: IResources) => void;
  renderData: IResourceServiceRenderData;
  cellar: boolean;
  pit: boolean;
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
  blockedProductionRound: number | null;
  canAffordResource: (
    resource: keyof IResourcesAmount,
    amount: number
  ) => boolean;
  canAffordResources: (resources: IResources) => boolean;
  spendResourceIfPossible: (
    resource: keyof IResourcesAmount,
    amount: number,
    logSource: string
  ) => void;
  spendResourceOrGetHurt: (
    resource: keyof IResourcesAmount,
    amount: number,
    logSource: string
  ) => void;

  spendResourcesIfPossible: (resources: IResources, logSource: string) => void;
  spendResourcesOrGetHurt: (resources: IResources, logSource: string) => void;
}
