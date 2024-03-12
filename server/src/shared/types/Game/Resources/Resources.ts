import {IMysteryCard, IBaseMysteryCardRenderData,} from "../MysteryService/MysteryCard";
import {IToken, ITokenRenderData} from "../TokenService/Token";

export interface IResources {
    basic: IBasicResources;
    treasures: IMysteryCard[];
    tokens: IToken[];
}

export interface IResourcesRenderData {
    basic: IBasicResourcesAmount;
    treasures: IBaseMysteryCardRenderData[];
    tokens: ITokenRenderData[];
}

export interface IBasicResourcesAmount {
    food: number;
    dryFood: number;
    wood: number;
    leather: number;
}

export interface IBasicResources {
    amount: Map<keyof IBasicResourcesAmount, number>;
    getResource: (key: keyof IBasicResourcesAmount) => number;
    setResource: (key: keyof IBasicResourcesAmount, value: number) => void;
    setResources: (amount: IBasicResourcesAmount) => void;
    canAfford: (resource: keyof IBasicResourcesAmount, amount: number) => boolean;
    addResource: (resource: keyof IBasicResourcesAmount, amount: number) => void;
    addResources: (resources: IBasicResources) => void;
    spendResource: (
        resource: keyof IBasicResourcesAmount,
        amount: number
    ) => void;
    resetResources: () => void;
    renderData: IBasicResourcesAmount;
}
