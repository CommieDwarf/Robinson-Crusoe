import { IResources } from "./Resources";

export interface IAllResources {
  future: IResources;
  owned: IResources;
  addFutureToOwned: () => void;
  addToOwned: (resources: IResources) => void;
}


