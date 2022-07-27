import Resources, {
  AllResources as IAllResources,
} from "../interfaces/Resources";

export default class AllResources implements IAllResources {
  future: Resources;
  owned: Resources;

  constructor() {
    this.future = {
      food: 0,
      dryFood: 0,
      wood: 0,
      leather: 0,
    };
    this.owned = {
      food: 0,
      dryFood: 0,
      wood: 0,
      leather: 0,
    };
  }

  addFutureToOwned() {
    Object.entries(this.future).forEach(([key, value]) => {
      const k = key as keyof typeof this.future;
      this.owned[k] += this.future[k];
      this.future[k] = 0;
    });
  }

  spendResources(resources: Resources) {
    if (this.getCanAfford(resources)) {
      Object.entries(this.owned).forEach(([key, value]) => {
        const k = key as keyof typeof this.owned;
        this.owned[k] -= resources[k];
      });
      return true;
    } else {
      return false;
    }
  }

  recoverResources(resources: Resources) {
    Object.entries(this.owned).forEach(([key, value]) => {
      const k = key as keyof typeof this.owned;
      this.owned[k] += resources[k];
    });
  }

  // ddd;

  getCanAfford(cost: Resources) {
    Object.entries(cost).forEach(([key, value]) => {
      const k = key as keyof typeof this.owned;
      if (this.owned[k] - value < 0) {
        return false;
      }
    });
    return true;
  }
}
