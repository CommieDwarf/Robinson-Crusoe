"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const BasicResources_1 = require("./BasicResources");
const LOG_CODE_1 = require("@shared/types/Game/ChatLog/LOG_CODE");
class ResourceService {
    get blockedProductionRound() {
        return this._blockedProductionRound;
    }
    set blockedProductionRound(value) {
        this._blockedProductionRound = value;
    }
    constructor(game) {
        this._future = {
            basic: new BasicResources_1.BasicResources(),
            treasures: [],
            tokens: [],
        };
        this._owned = {
            basic: new BasicResources_1.BasicResources(),
            treasures: [],
            tokens: [],
        };
        this._cellar = false;
        this._pit = false;
        this._blockedProductionRound = null;
        this.addFutureToOwned = () => {
            this._owned.basic.addResources(this._future.basic);
            this._owned.tokens = this._owned.tokens.concat(this._future.tokens);
            this._owned.treasures = this._owned.treasures.concat(this._future.treasures);
            this.resetFutureResources();
        };
        this.addBasicResourcesToOwned = (resources, logSource = "") => {
            if (logSource) {
                resources.amount.forEach((amount, res) => {
                    if (amount > 0) {
                        this.addBasicResourceToOwned(res, amount, logSource);
                    }
                });
            }
        };
        this._game = game;
    }
    // ------------------------------------------------
    get renderData() {
        return {
            future: this.unpackRenderData(this._future),
            owned: this.unpackRenderData(this._owned),
        };
    }
    get pit() {
        return this._pit;
    }
    set pit(value) {
        this._pit = value;
    }
    get future() {
        return this._future;
    }
    get owned() {
        return this._owned;
    }
    get cellar() {
        return this._cellar;
    }
    set cellar(value) {
        this._cellar = value;
    }
    // ------------------------------------
    addTokenToFuture(token) {
        this._future.tokens.push(token);
    }
    addTreasureToFuture(treasureCard) {
        this._future.treasures.push(treasureCard);
    }
    addTokenToOwned(token) {
        this._owned.tokens.push(token);
    }
    addTreasureToOwned(treasureCard) {
        this._owned.treasures.push(treasureCard);
    }
    unpackRenderData(resources) {
        return {
            basic: resources.basic.renderData,
            tokens: resources.tokens.map((token) => token.renderData),
            treasures: resources.treasures.map((treasure) => treasure.renderData),
        };
    }
    removeTreasureFromOwned(card) {
        this._owned.treasures = this._owned.treasures.filter((c) => c !== card);
    }
    removeTreasureFromFuture(card) {
        this._future.treasures = this._future.treasures.filter((c) => c !== card);
    }
    resetFutureResources() {
        this._future = {
            basic: new BasicResources_1.BasicResources(),
            tokens: [],
            treasures: [],
        };
    }
    addBasicResourceToOwned(resource, amount, logSource) {
        this._owned.basic.addResource(resource, amount);
        if (logSource) {
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.OWNED_RESOURCE_ADDED,
                amount,
                subject1: resource,
                subject2: ""
            }, "positive", logSource);
        }
    }
    addBasicResourceToFuture(resource, amount, logSource) {
        this._future.basic.addResource(resource, amount);
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.FUTURE_RESOURCE_ADDED,
            amount,
            subject1: resource,
            subject2: ""
        }, "positive", logSource);
    }
    addBasicResourcesToFuture(resources, logSource = "") {
        resources.amount.forEach((amount, resource) => {
            if (amount > 0) {
                this.addBasicResourceToFuture(resource, amount, logSource);
            }
        });
    }
    canAffordResource(resource, amount) {
        return this.owned.basic.canAfford(resource, amount);
    }
    canAffordResources(resources) {
        let canAfford = true;
        resources.amount.forEach((amount, resource) => {
            if (!this.canAffordResource(resource, amount)) {
                canAfford = false;
            }
        });
        return canAfford;
    }
    spendBasicResourceIfPossible(resource, amount, logSource = "") {
        if (amount === 0) {
            return;
        }
        const owned = this._owned.basic.getResource(resource);
        const realAmountToSpend = amount >= owned ? owned : amount;
        if (realAmountToSpend !== 0) {
            this.spendResourceFromOwned(resource, realAmountToSpend, logSource);
        }
    }
    spendBasicResourcesIfPossible(resources, logSource = "") {
        const entries = Object.entries(resources.amount);
        entries.forEach(([resource, amount]) => {
            this.spendBasicResourceIfPossible(resource, amount, logSource);
        });
    }
    spendBasicResourceOrGetHurt(resource, amount, logSource) {
        if (amount === 0) {
            return;
        }
        const ownedAmount = this._owned.basic.getResource(resource);
        const diff = ownedAmount - amount;
        if (diff < 0) {
            // this._owned.basic.setResource(resource, 0);
            this.spendResourceFromOwned(resource, ownedAmount, logSource);
            this._game.characterService.hurtAllPlayerCharacters(Math.abs(diff), logSource);
        }
        else {
            this.spendResourceFromOwned(resource, amount, logSource);
        }
    }
    spendResourceFromOwned(resource, amount, logSource) {
        if (!this._owned.basic.canAfford(resource, amount)) {
            throw new Error(`Spend amount can't be greater than owned! spendAmount: ${amount}. owned: ${this._owned.basic.getResource(resource)}`);
        }
        this._owned.basic.spendResource(resource, amount);
        if (logSource) {
            this._game.logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.OWNED_RESOURCE_REMOVED,
                subject1: resource,
                subject2: "",
                amount
            }, "negative", logSource);
        }
    }
    spendResourcesOrGetHurt(resources, logSource) {
        const entries = Object.entries(resources.amount);
        entries.forEach(([resource, amount]) => {
            this.spendBasicResourceOrGetHurt(resource, amount, logSource);
        });
    }
    getOwnedTreasureMysteryCard(cardName) {
        const card = this._owned.treasures.find((card) => card.name === cardName);
        if (!card) {
            throw new Error(`There is no ${cardName} in owned treasures`);
        }
        return card;
    }
}
exports.ResourceService = ResourceService;
//# sourceMappingURL=ResourceService.js.map