import {IBasicResources, IBasicResourcesAmount,} from "../../types/Resources/Resources";
import Entries from "../../types/Entries";

const initialResources: IBasicResourcesAmount = {
    food: 0,
    dryFood: 0,
    wood: 0,
    leather: 0,
};

export class BasicResources implements IBasicResources {
    private _amount = new Map<keyof IBasicResourcesAmount, number>(
        Object.entries(initialResources) as Entries<IBasicResourcesAmount>
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
        ) as unknown as IBasicResourcesAmount;
    }

    get amount(): Map<keyof IBasicResourcesAmount, number> {
        return this._amount;
    }

    public resetResources = (): void => {
        this._amount.forEach((value: number, key: keyof IBasicResourcesAmount) => {
            this._amount.set(key, 0);
        });
    };

    public getResource = (key: keyof IBasicResourcesAmount): number => {
        return this._amount.get(key) as number;
    };

    public setResource = (
        key: keyof IBasicResourcesAmount,
        value: number
    ): void => {
        this._amount.set(key, value);
    };
    public setResources = (amount: IBasicResourcesAmount) => {
    };

    public canAfford = (
        resource: keyof IBasicResourcesAmount,
        amount: number
    ): boolean => {
        return this.getResource(resource) - amount >= 0;
    };

    public addResources(resources: IBasicResources): void {
        resources.amount.forEach(
            (value: number, key: keyof IBasicResourcesAmount) => {
                this.setResource(
                    key,
                    this.getResource(key) + resources.getResource(key)
                );
            }
        );
    }

    public spendResource(resource: keyof IBasicResourcesAmount, amount: number) {
        const owned = this._amount.get(resource);
        if (owned === undefined) {
            throw new Error("owned is undefined")
        }
        this._amount.set(resource, owned - amount);
    }

    public addResource(resource: keyof IBasicResourcesAmount, amount: number) {
        this._amount.set(resource, (this._amount.get(resource) as number) + amount);
    }
}
