import {
    IBasicResources,
    IBasicResourcesAmount,
    IResources,
    IResourcesRenderData,
} from "./Resources";
import {IToken} from "../TokenService/Token";
import {IMysteryCard} from "../MysteryService/MysteryCard";

export interface IResourceServiceRenderData {
    future: IResourcesRenderData;
    owned: IResourcesRenderData;
}

export interface IResourceService {
    future: IResources;
    owned: IResources;
    addFutureToOwned: () => void;
    addBasicResourcesToOwned: (resources: IBasicResources, logSource?: string) => void;
    addBasicResourcesToFuture: (resources: IBasicResources, logSource?: string) => void;
    renderData: IResourceServiceRenderData;
    cellar: boolean;
    pit: boolean;
    addBasicResourceToOwned: (
        resource: keyof IBasicResourcesAmount,
        amount: number,
        logSource: string
    ) => void;
    addBasicResourceToFuture: (
        resource: keyof IBasicResourcesAmount,
        amount: number,
        logSource: string
    ) => void;
    addTokenToFuture: (token: IToken) => void;
    addTreasureToFuture: (treasureCard: IMysteryCard) => void;
    addTokenToOwned: (token: IToken) => void;
    addTreasureToOwned: (treasureCard: IMysteryCard) => void;

    blockedProductionRound: number | null;
    canAffordResource: (
        resource: keyof IBasicResourcesAmount,
        amount: number
    ) => boolean;
    canAffordResources: (resources: IBasicResources) => boolean;
    spendBasicResourceIfPossible: (
        resource: keyof IBasicResourcesAmount,
        amount: number,
        logSource: string,
    ) => void;
    spendBasicResourceOrGetHurt: (
        resource: keyof IBasicResourcesAmount,
        amount: number,
        logSource: string
    ) => void;

    spendBasicResourcesIfPossible: (
        resources: IBasicResources,
        logSource: string
    ) => void;
    spendResourcesOrGetHurt: (
        resources: IBasicResources,
        logSource: string
    ) => void;
    removeTreasureFromOwned: (card: IMysteryCard) => void;
    removeTreasureFromFuture: (card: IMysteryCard) => void;
    getOwnedTreasureMysteryCard: (cardName: string) => IMysteryCard;
}
