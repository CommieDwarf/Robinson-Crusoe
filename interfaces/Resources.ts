export interface IResources {
  food: number;
  dryFood: number;
  wood: number;
  leather: number;
}

export interface IAllResources {
  owned: Map<keyof IResources, number>;
  future: Map<keyof IResources, number>;
}
