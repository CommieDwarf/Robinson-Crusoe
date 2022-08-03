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
  addToAllResources: (newResources: IResources) => void;
  resetResources: () => void;
  spendFromAllResources: (resources: IResources) => void;
}
