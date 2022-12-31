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
  canAfford: (resource: keyof IResourcesAmount, amount: number) => boolean;
  addResource: (resource: keyof IResourcesAmount, amount: number) => void;
  addResources: (resources: IResources) => void;
  spendResource: (resource: keyof IResourcesAmount, amount: number) => void;
  resetResources: () => void;
  renderData: IResourcesAmount;
}
