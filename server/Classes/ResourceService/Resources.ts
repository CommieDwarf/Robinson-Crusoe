import {
  IResources,
  IResourcesAmount,
} from "../../../interfaces/Resources/Resources";
import Entries from "../../../interfaces/Entries";

const initialResources: IResourcesAmount = {
  food: 0,
  dryFood: 0,
  wood: 0,
  leather: 0,
};

export class Resources implements IResources {
  private _amount = new Map<keyof IResourcesAmount, number>(
    Object.entries(initialResources) as Entries<IResourcesAmount>
  );

  constructor(food = 0, dryFood = 0, wood = 0, leather = 0) {
    this.setResource("food", food);
    this.setResource("dryFood", dryFood);
    this.setResource("wood", wood);
    this.setResource("leather", leather);
  }

  get renderData() {
    return Object.fromEntries(
      this._amount.entries()
    ) as unknown as IResourcesAmount;
  }

  get amount(): Map<keyof IResourcesAmount, number> {
    return this._amount;
  }

  public resetResources = (): void => {
    this._amount.forEach((value: number, key: keyof IResourcesAmount) => {
      this._amount.set(key, 0);
    });
  };

  public getResource = (key: keyof IResourcesAmount): number => {
    return this._amount.get(key) as number;
  };

  public setResource = (key: keyof IResourcesAmount, value: number): void => {
    this._amount.set(key, value);
  };
  public setResources = (amount: IResourcesAmount) => {};

  public canAfford = (cost: IResources): boolean => {
    for (let key of this._amount.keys()) {
      if (this.getResource(key) < cost.getResource(key)) {
        return false;
      }
    }

    return true;
  };

  public addResources(resources: IResources): void {
    resources.amount.forEach((value: number, key: keyof IResourcesAmount) => {
      this.setResource(key, this.getResource(key) + resources.getResource(key));
    });
  }

  public addSingleResource(resource: keyof IResourcesAmount, amount: number) {
    this._amount.set(resource, this.getResource(resource) + amount);
  }

  public spendResources = (cost: IResources): void => {
    if (!this.canAfford(cost)) {
      throw new Error(
        `Cant afford. Cost: ${cost.amount}. Resources: ${this._amount}`
      );
    }
    this._amount.forEach((value: number, key: keyof IResourcesAmount) => {
      this.setResource(key, this.getResource(key) - cost.getResource(key));
    });
  };

  public spendSingleResource(resource: keyof IResourcesAmount, amount: number) {
    if (this.getResource(resource) < amount) {
      throw new Error("Not sufficent resources - " + amount + "" + resource);
    }
    this._amount.set(resource, -amount);
  }

  public addResource(resource: keyof IResourcesAmount, amount: number) {
    this._amount.set(resource, (this._amount.get(resource) as number) + amount);
  }
}
