"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysteryCardDrawer = void 0;
const MysteryCard_1 = require("../../../shared/types/Game/MysteryService/MysteryCard");
const TreasureMysteryCard_1 = require("./MysteryCardCreator/Cards/Treasure/TreasureMysteryCard/TreasureMysteryCard");
class MysteryCardDrawer {
    constructor(mysteryService, creature, trap, treasure, drawer, max) {
        this._cardsExcluded = [];
        this._canFinish = false;
        this._finished = false;
        this._cardDrewCount = 0;
        this._acquiredTreasures = [];
        this._mysteryService = mysteryService;
        this._creature = creature;
        this._trap = trap;
        this._treasure = treasure;
        this._drawer = drawer;
        this._max = max;
    }
    get canFinish() {
        return this._canFinish;
    }
    get creature() {
        return this._creature;
    }
    get trap() {
        return this._trap;
    }
    get treasure() {
        return this._treasure;
    }
    get canDraw() {
        return (this._trap > 0 || this._creature > 0 || this._treasure > 0) && this._max > this._cardDrewCount;
    }
    get drawer() {
        return this._drawer;
    }
    get finished() {
        return this._finished;
    }
    get acquiredTreasures() {
        return this._acquiredTreasures;
    }
    getCardTypes() {
        const types = [];
        if (this._creature > 0) {
            types.push(MysteryCard_1.MYSTERY_CARD_TYPE.CREATURE);
        }
        if (this._trap > 0) {
            types.push(MysteryCard_1.MYSTERY_CARD_TYPE.TRAP);
        }
        if (this._treasure > 0) {
            types.push(MysteryCard_1.MYSTERY_CARD_TYPE.TREASURE);
        }
        return types;
    }
    getMysteryCard(types) {
        let cardsExcluded = [];
        let found;
        do {
            let card = this._mysteryService.cardStack.pop();
            if (!card) {
                //TODO: unlikely ScenarioButton but i need to handle it in the future.
                throw new Error("there is no card in the stack");
            }
            // @ts-ignore
            if (types.some((type) => type === card.type)) {
                found = card;
            }
            else {
                cardsExcluded.push(card);
            }
        } while (!found);
        this._cardsExcluded = this._cardsExcluded.concat(cardsExcluded);
        return found;
    }
    drawCard() {
        this._canFinish = true;
        const types = this.getCardTypes();
        const card = this.getMysteryCard(types);
        if (card instanceof TreasureMysteryCard_1.TreasureMysteryCard) {
            this._acquiredTreasures.push(card);
        }
        this.decrCardType(card.type);
        this._cardDrewCount++;
        return card;
    }
    decrCardType(type) {
        switch (type) {
            case MysteryCard_1.MYSTERY_CARD_TYPE.CREATURE:
                this._creature--;
                break;
            case MysteryCard_1.MYSTERY_CARD_TYPE.TRAP:
                this._trap--;
                break;
            case MysteryCard_1.MYSTERY_CARD_TYPE.TREASURE:
                this._treasure--;
                break;
            default:
                throw new Error("wrong mystery card type: " + type);
        }
    }
    disableDrawingCards() {
        this._max = 0;
    }
    finish() {
        if (this._canFinish) {
            this._mysteryService.shuffleBackIntoStack(this._cardsExcluded);
            this._finished = true;
        }
    }
}
exports.MysteryCardDrawer = MysteryCardDrawer;
//# sourceMappingURL=MysteryCardDrawer.js.map