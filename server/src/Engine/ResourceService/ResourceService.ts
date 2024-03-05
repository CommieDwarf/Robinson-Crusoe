import {BasicResources} from "./BasicResources";
import {
    IBasicResources,
    IBasicResourcesAmount,
    IResources,
    IResourcesRenderData,
} from "../../types/Resources/Resources";
import {IResourceService, IResourceServiceRenderData,} from "../../types/Resources/AllResources";
import {IGame} from "../../types/Game";
import Entries from "../../types/Entries";
import i18n from "../../../../client/I18n/I18n";
import {IToken} from "../../types/TokenService/Token";
import {IMysteryCard} from "../../types/MysteryService/MysteryCard";
import capitalizeFirstLetter from "../../../../utils/capitalizeFirstLetter";

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
        this._owned.basic.addResources(resources);
        if (logSource) {
            this._game.chatLog.addMessage(`Dodano do posiadanych surowców: ${this.getResourcesMsgString(resources)}`, "green", logSource)
        }
    };

    public addBasicResourceToOwned(
        resource: keyof IBasicResourcesAmount,
        amount: number,
        logSource: string
    ) {
        this._owned.basic.addResource(resource, amount);

        if (logSource) {
            this._game.chatLog.addMessage(
                `Dodano ${amount} ${i18n.t(`resource.${resource}`, {
                    count: amount,
                })} do posiadanych surowców`,
                "green",
                logSource
            );
        }
    }

    public addBasicResourceToFuture(
        resource: keyof IBasicResourcesAmount,
        amount: number,
        logSource: string
    ) {
        this._future.basic.addResource(resource, amount);
        this._game.chatLog.addMessage(
            `Dodano ${amount} ${i18n.t(`resource.${resource}`, {
                count: amount,
            })} do przyszłych surowców`,
            "green",
            logSource
        );
    }

    public addBasicResourcesToFuture(resources: IBasicResources, logSource: string = "") {
        this._future.basic.addResources(resources);
        if (logSource) {
            this._game.chatLog.addMessage(`Dodano do przyszłych surowców: ${this.getResourcesMsgString(resources)}`, "green", logSource)
        }
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

        this._owned.basic.spendResource(resource, realAmountToSpend);
        if (logSource.length > 0 && realAmountToSpend !== 0) {
            this._game.chatLog.addMessage(
                `Odjęto ${realAmountToSpend} ${i18n.t(`resource.${resource}`, {
                    count: amount,
                })} z posiadanych surowców`,
                "red",
                logSource
            );
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
        const diff = this._owned.basic.getResource(resource) - amount;
        if (diff < 0) {
            this._owned.basic.setResource(resource, 0);
            this._game.characterService.hurtAllPlayerCharacters(
                Math.abs(diff),
                logSource
            );
        } else {
            this._owned.basic.spendResource(resource, amount);
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

    private getResourcesMsgString(resources: IBasicResources) {

        return Array.from(resources.amount.entries()).filter(([res, amount]) => amount !== 0)
            .map(([res, amount]) => `${capitalizeFirstLetter(i18n.t("resource." + res))}(${amount})`).join(", ");
    }
}
