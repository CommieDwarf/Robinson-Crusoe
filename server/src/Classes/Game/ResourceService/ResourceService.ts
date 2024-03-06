import {BasicResources} from "./BasicResources";
import {
    IBasicResources,
    IBasicResourcesAmount,
    IResources,
    IResourcesRenderData,
} from "@shared/types/Game/Resources/Resources";
import {IResourceService, IResourceServiceRenderData,} from "@shared/types/Game/Resources/AllResources";
import {IGame} from "@shared/types/Game/Game";
import {IToken} from "@shared/types/Game/TokenService/Token";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import Entries from "@shared/types/Entries";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";


export class ResourceService implements IResourceService {
    private _future: IResources = {
        basic: new BasicResources(),
        treasures: [],
        tokens: [],
    };
    private _owned: IResources = {
        basic: new BasicResources(),
        treasures: [],
        tokens: [],
    };

    private _cellar: boolean = false;
    private _pit: boolean = false;

    get blockedProductionRound(): number | null {
        return this._blockedProductionRound;
    }

    set blockedProductionRound(value: number | null) {
        this._blockedProductionRound = value;
    }

    private _blockedProductionRound: null | number = null;
    private readonly _game: IGame;

    constructor(game: IGame) {
        this._game = game;
    }

    // ------------------------------------------------

    get renderData(): IResourceServiceRenderData {
        return {
            future: this.unpackRenderData(this._future),
            owned: this.unpackRenderData(this._owned),
        };
    }

    get pit(): boolean {
        return this._pit;
    }

    set pit(value: boolean) {
        this._pit = value;
    }

    get future(): IResources {
        return this._future;
    }

    get owned(): IResources {
        return this._owned;
    }

    get cellar(): boolean {
        return this._cellar;
    }

    set cellar(value: boolean) {
        this._cellar = value;
    }

    // ------------------------------------

    public addTokenToFuture(token: IToken) {
        this._future.tokens.push(token);
    }

    public addTreasureToFuture(treasureCard: IMysteryCard) {
        this._future.treasures.push(treasureCard);
    }

    public addTokenToOwned(token: IToken) {
        this._owned.tokens.push(token);
    }

    public addTreasureToOwned(treasureCard: IMysteryCard) {
        this._owned.treasures.push(treasureCard);
    }

    private unpackRenderData(resources: IResources): IResourcesRenderData {
        return {
            basic: resources.basic.renderData,
            tokens: resources.tokens.map((token) => token.renderData),
            treasures: resources.treasures.map((treasure) => treasure.getRenderData()),
        };
    }

    public removeTreasureFromOwned(card: IMysteryCard) {
        this._owned.treasures = this._owned.treasures.filter((c) => c !== card);
    }

    public removeTreasureFromFuture(card: IMysteryCard) {
        this._future.treasures = this._future.treasures.filter((c) => c !== card);
    }

    public addFutureToOwned = (): void => {
        this._owned.basic.addResources(this._future.basic);
        this._owned.tokens = this._owned.tokens.concat(this._future.tokens);
        this._owned.treasures = this._owned.treasures.concat(
            this._future.treasures
        );
        this.resetFutureResources();
    };

    private resetFutureResources() {
        this._future = {
            basic: new BasicResources(),
            tokens: [],
            treasures: [],
        };
    }


    public addBasicResourcesToOwned = (resources: IBasicResources, logSource: string = ""): void => {
        if (logSource) {
            resources.amount.forEach((amount, res) => {
                if (amount > 0) {
                    this.addBasicResourceToOwned(res, amount, logSource);
                }
            })
        }
    };

    public addBasicResourceToOwned(
        resource: keyof IBasicResourcesAmount,
        amount: number,
        logSource: string
    ) {
        this._owned.basic.addResource(resource, amount);

        if (logSource) {
            this._game.logService.addMessage({
                code: LOG_CODE.OWNED_RESOURCE_ADDED,
                amount,
                subject1: resource,
                subject2: ""
            }, "positive", logSource)

        }

    }

    public addBasicResourceToFuture(
        resource: keyof IBasicResourcesAmount,
        amount: number,
        logSource: string
    ) {
        this._future.basic.addResource(resource, amount);
        this._game.logService.addMessage({
            code: LOG_CODE.FUTURE_RESOURCE_ADDED,
            amount,
            subject1: resource,
            subject2: ""
        }, "positive", logSource)
    }

    public addBasicResourcesToFuture(resources: IBasicResources, logSource: string = "") {
        resources.amount.forEach((amount, resource) => {
            if (amount > 0) {
                this.addBasicResourceToFuture(resource, amount, logSource)
            }
        })
    }

    public canAffordResource(
        resource: keyof IBasicResourcesAmount,
        amount: number
    ) {
        return this.owned.basic.canAfford(resource, amount);
    }

    public canAffordResources(resources: IBasicResources) {
        let canAfford = true;
        resources.amount.forEach((amount, resource) => {
            if (!this.canAffordResource(resource, amount)) {
                canAfford = false;
            }
        });
        return canAfford;
    }

    spendBasicResourceIfPossible(
        resource: keyof IBasicResourcesAmount,
        amount: number,
        logSource: string = ""
    ) {
        if (amount === 0) {
            return;
        }
        const owned = this._owned.basic.getResource(resource)
        const realAmountToSpend = amount >= owned ? owned : amount;

        if (logSource.length > 0 && realAmountToSpend !== 0) {
            this.spendResourceFromOwned(resource, realAmountToSpend, logSource);
        }
    }

    spendBasicResourcesIfPossible(
        resources: IBasicResources,
        logSource: string = ""
    ) {
        const entries = Object.entries(
            resources.amount
        ) as Entries<IBasicResourcesAmount>;
        entries.forEach(([resource, amount]) => {
            this.spendBasicResourceIfPossible(resource, amount, logSource);
        });
    }

    spendBasicResourceOrGetHurt(
        resource: keyof IBasicResourcesAmount,
        amount: number,
        logSource: string
    ) {
        if (amount === 0) {
            return;
        }
        const ownedAmount = this._owned.basic.getResource(resource)
        const diff = ownedAmount - amount;
        if (diff < 0) {
            this._owned.basic.setResource(resource, 0);
            this.spendResourceFromOwned(resource, ownedAmount, logSource)
            this._game.characterService.hurtAllPlayerCharacters(
                Math.abs(diff),
                logSource
            );
        } else {
            this.spendResourceFromOwned(resource, amount, logSource)
        }
    }

    private spendResourceFromOwned(resource: keyof IBasicResourcesAmount, amount: number, logSource: string): void {
        if (!this._owned.basic.canAfford(resource, amount)) {
            throw new Error(`Spend amount can't be greater than owned! spendAmount: ${amount}. owned: ${this._owned.basic.getResource(resource)}`)
        }
        this._owned.basic.spendResource(resource, amount);
        if (logSource) {
            this._game.logService.addMessage({
                code: LOG_CODE.OWNED_RESOURCE_REMOVED,
                subject1: resource,
                subject2: "",
                amount
            }, "negative", logSource)
        }
    }

    spendResourcesOrGetHurt(resources: IBasicResources, logSource: string) {
        const entries = Object.entries(
            resources.amount
        ) as Entries<IBasicResourcesAmount>;
        entries.forEach(([resource, amount]) => {
            this.spendBasicResourceOrGetHurt(resource, amount, logSource);
        });
    }


    public getOwnedTreasureMysteryCard(cardName: string) {
        const card = this._owned.treasures.find((card) => card.name === cardName);
        if (!card) {
            throw new Error(`There is no ${cardName} in owned treasures`);
        }
        return card;
    }


}
