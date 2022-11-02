export interface IResourcesAmount {
  food: number;
  dryFood: number;
  wood: number;
  leather: number;
}

export interface IResources {
  amount: Map<keyof IResourcesAmount, number>;
  getResource: (key: keyof IResourcesAmount) => number;
  setResource: (key: keyof IResourcesAmount, value: number) => void;
  setResources: (amount: IResourcesAmount) => void;
  canAfford: (cost: IResources) => boolean;
  addResources: (newResources: IResources) => void;
  addSingleResource: (resource: keyof IResourcesAmount, amount: number) => void;
  spendResources: (resources: IResources) => void;
  spendSingleResource: (
    resource: keyof IResourcesAmount,
    amount: number
  ) => void;
  resetResources: () => void;
  renderData: IResourcesAmount;
}
