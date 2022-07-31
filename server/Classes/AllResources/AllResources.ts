import {IResources} from "../../../interfaces/Resources";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const initialResources: IResources = {
  food: 0,
  dryFood: 0,
  wood: 0,
  leather: 0,
};

export class Resources {


  private _amount = new Map<keyof IResources, number>(
      Object.entries(initialResources) as Entries<IResources>
  );

  constructor(food = 0, dryFood = 0, wood = 0, leather = 0) {
    this.setResource("food", food);
    this.setResource("dryFood", dryFood);
    this.setResource("wood", wood);
    this.setResource("leather", leather);
  }

  get amount(): Map<keyof IResources, number> {
    return this._amount;
  }


  public getResource = (key: keyof IResources): number => {
    return this._amount.get(key) as number;
  };

  public setResource = (key: keyof IResources, value: number): void => {
    this._amount.set(key, value);
  };

  public canAfford = (cost: Resources): boolean => {
    for (let key of this._amount.keys()) {
      if (this.getResource(key) < cost.getResource(key)) {
        return false;
      }
    }

    return true;
  };

  public addToAllResources = (newResources: Resources): void => {
    newResources._amount.forEach((value: number, key: keyof IResources) => {
      this.setResource(
          key,
          this.getResource(key) + newResources.getResource(key)
      );
    });
  };

  public resetResources = (): void => {
    this._amount.forEach((value: number, key: keyof IResources) => {
      this._amount.set(key, 0);
    });
  };

  public spendFromAllResources = (resources: Resources): void => {
    if (this.canAfford(resources)) {
      this._amount.forEach((value: number, key: keyof IResources) => {
        this.setResource(
            key,
            this.getResource(key) - resources.getResource(key)
        );
      });
    }
  };
}

export default class AllResources {
  get future(): Resources {
    return this._future;
  }

  get owned(): Resources {
    return this._owned;
  }

  private _future: Resources = new Resources();
  private _owned: Resources = new Resources();

  public addFutureToOwned = (): void => {
    this._owned.addToAllResources(this._future);
    this._future.resetResources();
  };

  public recoverResources = (resources: Resources): void => {
    this._owned.addToAllResources(resources);
  };
}
