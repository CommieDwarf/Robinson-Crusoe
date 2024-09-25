"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeastService = void 0;
const Beast_1 = require("../../../shared/types/Game/Beasts/Beast");
const BeastCreator_1 = require("./BeastCreator/BeastCreator");
const Construction_1 = require("../../../shared/types/Game/ConstructionService/Construction");
const MYSTERY_CARD_1 = require("../../../shared/types/Game/MysteryService/MYSTERY_CARD");
const LOG_CODE_1 = require("../../../shared/types/Game/ChatLog/LOG_CODE");
const ACTION_1 = require("../../../shared/types/Game/ACTION");
const isPlayerCharacter_1 = require("../../../shared/utils/typeGuards/isPlayerCharacter");
class BeastService {
    constructor(game) {
        this._deck = [];
        this._beastStack = [];
        this._game = game;
        this._beastCreator = new BeastCreator_1.BeastCreator(game);
        this.initBeasts();
    }
    get renderData() {
        return {
            deckCount: this.deckCount,
        };
    }
    // --------------------------------------
    get deckCount() {
        return this._deck.length;
    }
    // --------------------------------------------
    peekBeastFromDeck() {
        if (this.deckCount === 0) {
            throw new Error("There is no more beasts in the deck");
        }
        return this._deck[this.deckCount - 1];
    }
    removeBeastFromDeck() {
        this._deck.pop();
    }
    moveBeastFromStackToDeck() {
        const beast = this._beastStack.pop();
        if (!beast) {
            throw new Error("There is no more beasts to push into the deck");
        }
        this._deck.push(beast);
    }
    addBeastToDeck(beast) {
        this._deck.push(beast);
    }
    swapDeckTopToBottom() {
        let beastFromTop = this._deck.pop();
        if (beastFromTop) {
            this._deck.unshift(beastFromTop);
        }
    }
    getBeastsFromStack(amount) {
        let beasts = [];
        for (let i = 0; i < amount; i++) {
            let beast = this._beastStack.pop();
            if (beast) {
                beasts.push(beast);
            }
        }
        return beasts;
    }
    fightBeast(leader, beast) {
        const strengthDiff = this.calcStrengthDiff(leader, beast);
        this.logBeastGotHunted();
        this.applyHuntEffects(strengthDiff, leader, beast);
        beast.applySpecialEffect();
        this.addHuntReward(beast);
        this.resetWeaponBoosts(leader);
    }
    fightCustomBeast(leader, beastStats) {
        const beast = this._beastCreator.createCustomBeast(beastStats);
        this.fightBeast(leader, beast);
    }
    static getStrongestBeast(beasts) {
        let strength = 0;
        let current = null;
        beasts.forEach((beast) => {
            if (beast.strength > strength) {
                current = beast;
            }
        });
        return current;
    }
    resetWeaponBoosts(hunter) {
        this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.WEAPON).resetTemporaryBoost();
        if ((0, isPlayerCharacter_1.isPlayerCharacter)(hunter)) {
            hunter.weaponBoost = 0;
        }
    }
    addHuntReward(beast) {
        if (this._game.phaseService.phase === "action") {
            this._game.resourceService.addBasicResourcesToFuture(beast.reward, ACTION_1.ACTION.HUNT);
        }
        else {
            this._game.resourceService.addBasicResourcesToOwned(beast.reward);
        }
    }
    applyHuntEffects(strengthDiff, hunter, beast) {
        if (strengthDiff < 0) {
            this._game.characterService.hurt(hunter, Math.abs(strengthDiff), ACTION_1.ACTION.HUNT);
        }
        this._game.constructionService.lvlDownOrGetHurt(Construction_1.CONSTRUCTION.WEAPON, beast.weaponLoss, ACTION_1.ACTION.HUNT);
    }
    calcStrengthDiff(hunter, beast) {
        const beastStrength = this.getStrengthWithModifiers(beast);
        const weaponStrength = this.calculateWeaponStrength(hunter);
        return weaponStrength - beastStrength;
    }
    logBeastGotHunted() {
        this._game.logService.addMessage({
            code: LOG_CODE_1.LOG_CODE.BEAST_GOT_HUNTED,
            subject1: "",
            subject2: "",
            amount: 1,
        }, "positive", ACTION_1.ACTION.HUNT);
    }
    calculateWeaponStrength(hunter) {
        const weapon = this._game.constructionService.getConstruction(Construction_1.CONSTRUCTION.WEAPON);
        let weaponLvl = weapon.boostedLvl;
        if ((0, isPlayerCharacter_1.isPlayerCharacter)(hunter)) {
            weaponLvl += hunter.weaponBoost;
        }
        return weaponLvl;
    }
    getStrengthWithModifiers(beast) {
        let strength = beast.strength;
        if (this._game.mysteryService.hasTreasureCard(MYSTERY_CARD_1.TREASURE_MYSTERY_CARD.HELMET)) {
            strength--;
        }
        return strength;
    }
    initBeasts() {
        this._beastStack = Object.values(Beast_1.BEAST).map((beast) => this._beastCreator.create(beast));
    }
}
exports.BeastService = BeastService;
//# sourceMappingURL=BeastService.js.map