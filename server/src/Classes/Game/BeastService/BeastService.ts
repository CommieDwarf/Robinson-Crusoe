import {IBeastService, IBeastServiceRenderData,} from "@shared/types/Game/Beasts/BeastService";
import {BEAST, IBeast} from "@shared/types/Game/Beasts/Beast";
import {IGame} from "@shared/types/Game/Game";
import {BeastCreator, BeastStats} from "./BeastCreator/BeastCreator";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {TREASURE_MYSTERY_CARD} from "@shared/types/Game/MysteryService/MYSTERY_CARD";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {ACTION} from "@shared/types/Game/ACTION";
import {isPlayerCharacter} from "@shared/utils/typeGuards/isPlayerCharacter";

export class BeastService implements IBeastService {
    private _deck: IBeast[] = [];
    // TODO: implement init
    private _game: IGame;
    private _beastStack: IBeast[] = [];
    private _beastCreator: BeastCreator;

    constructor(game: IGame) {
        this._game = game;
        this._beastCreator = new BeastCreator(game);
        this.initBeasts();
    }

    get renderData(): IBeastServiceRenderData {
        return {
            deckCount: this.deckCount,
        };
    }

    // --------------------------------------
    get deckCount() {
        return this._deck.length;
    }


    // --------------------------------------------

    peekBeastFromDeck(): IBeast {
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

    addBeastToDeck(beast: IBeast) {
        this._deck.push(beast);
    }

    swapDeckTopToBottom() {
        let beastFromTop = this._deck.pop();
        if (beastFromTop) {
            this._deck.unshift(beastFromTop);
        }
    }

    getBeastsFromStack(amount: number) {
        let beasts: IBeast[] = [];
        for (let i = 0; i < amount; i++) {
            let beast = this._beastStack.pop();
            if (beast) {
                beasts.push(beast);
            }
        }
        return beasts;
    }

    public fightBeast(leader: ICharacter, beast: IBeast) {
        const strengthDiff = this.calcStrengthDiff(leader, beast)
        this.logBeastGotHunted();
        this.applyHuntEffects(strengthDiff, leader, beast);
        beast.applySpecialEffect();
        this.addHuntReward(beast);
        this.resetWeaponBoosts(leader);
    }

    fightCustomBeast(leader: ICharacter, beastStats: BeastStats) {
        const beast = this._beastCreator.createCustomBeast(beastStats);
        this.fightBeast(leader, beast);
    }


    static getStrongestBeast(beasts: IBeast[]) {
        let strength = 0;
        let current: null | IBeast = null;
        beasts.forEach((beast) => {
            if (beast.strength > strength) {
                current = beast;
            }
        });

        return current;
    }

    private resetWeaponBoosts(hunter: ICharacter) {
        this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).resetTemporaryBoost();
        if (isPlayerCharacter(hunter)) {
            hunter.weaponBoost = 0;
        }
    }

    private addHuntReward(beast: IBeast) {
        if (this._game.phaseService.phase === "action") {
            this._game.resourceService.addBasicResourcesToFuture(beast.reward, ACTION.HUNT);
        } else {
            this._game.resourceService.addBasicResourcesToOwned(beast.reward);
        }
    }

    private applyHuntEffects(strengthDiff: number, hunter: ICharacter, beast: IBeast) {
        if (strengthDiff < 0) {
            this._game.characterService.hurt(hunter, Math.abs(strengthDiff), ACTION.HUNT);
        }
        this._game.constructionService.lvlDownOrGetHurt(CONSTRUCTION.WEAPON, beast.weaponLoss, ACTION.HUNT);
    }

    private calcStrengthDiff(hunter: ICharacter, beast: IBeast) {
        const beastStrength = this.getStrengthWithModifiers(beast);
        const weaponStrength = this.calculateWeaponStrength(hunter);
        return weaponStrength - beastStrength;
    }

    private logBeastGotHunted() {
        this._game.logService.addMessage({
            code: LOG_CODE.BEAST_GOT_HUNTED,
            subject1: "",
            subject2: "",
            amount: 1,
        }, "positive", ACTION.HUNT);
    }

    private calculateWeaponStrength(hunter: ICharacter) {
        const weapon = this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON);
        let weaponLvl = weapon.boostedLvl;
        if (isPlayerCharacter(hunter)) {
            weaponLvl += hunter.weaponBoost;
        }
        return weaponLvl;
    }


    private getStrengthWithModifiers(beast: IBeast) {
        let strength = beast.strength;
        if (this._game.mysteryService.hasTreasureCard(TREASURE_MYSTERY_CARD.HELMET)) {
            strength--;
        }
        return strength;
    }

    private initBeasts() {
        this._beastStack = Object.values(BEAST).map((beast) => this._beastCreator.create(beast));
    }
}
