"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicResources = void 0;
const initialResources = {
    food: 0,
    dryFood: 0,
    wood: 0,
    leather: 0,
};
class BasicResources {
    constructor(food = 0, dryFood = 0, wood = 0, leather = 0) {
        this._amount = new Map(Object.entries(initialResources));
        this.resetResources = () => {
            this._amount.forEach((value, key) => {
                this._amount.set(key, 0);
            });
        };
        this.getResource = (key) => {
            return this._amount.get(key);
        };
        this.setResource = (key, value) => {
            this._amount.set(key, value);
        };
        this.setResources = (amount) => {
        };
        this.canAfford = (resource, amount) => {
            return this.getResource(resource) - amount >= 0;
        };
        this.setResource("food", food);
        this.setResource("dryFood", dryFood);
        this.setResource("wood", wood);
        this.setResource("leather", leather);
    }
    get renderData() {
        return Object.fromEntries(this._amount.entries());
    }
    get amount() {
        return this._amount;
    }
    addResources(resources) {
        resources.amount.forEach((value, key) => {
            this.setResource(key, this.getResource(key) + resources.getResource(key));
        });
    }
    spendResource(resource, amount) {
        const owned = this._amount.get(resource);
        if (owned === undefined) {
            throw new Error("owned is undefined");
        }
        this._amount.set(resource, owned - amount);
    }
    addResource(resource, amount) {
        this._amount.set(resource, this._amount.get(resource) + amount);
    }
}
exports.BasicResources = BasicResources;
//# sourceMappingURL=BasicResources.js.map