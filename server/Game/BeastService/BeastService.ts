import {IBeastService, IBeastServiceRenderData,} from "../../../interfaces/Beasts/BeastService";
import {BEAST, IBeast} from "../../../interfaces/Beasts/Beast";
import {IGame} from "../../../interfaces/Game";
import {BeastCreator, BeastStats} from "./BeastCreator/BeastCreator";
import {CONSTRUCTION} from "../../../interfaces/ConstructionService/Construction";
import {IPlayerCharacter} from "../../../interfaces/Characters/PlayerCharacter";
import {TREASURE_MYSTERY_CARD} from "../../../interfaces/MysteryService/MYSTERY_CARD";

export class BeastService implements IBeastService {
    private _deck: IBeast[] = [];
    // TODO: implement init
    private _game: IGame;
    private _beastStack: IBeast[] = [];

    private _beastCreator: BeastCreator;

    constructor(game: IGame) {
        this._game = game;
        this._beastStack.push(new BeastCreator(game).create(BEAST.TIGER));
        this._beastCreator = new BeastCreator(game);
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

    fightBeast(leader: IPlayerCharacter, beast: IBeast) {
        const modifiedStrength = this.getStrengthWithModifiers(beast);
        const weapon = this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON);
        const weaponLvl = weapon.boostedLvl;
        const diff = weaponLvl - modifiedStrength;
        this._game.chatLog.addMessage("Bestia upolowana!", "green", beast.namePL);
        if (diff < 0) {
            this._game.characterService.hurt(leader, Math.abs(diff), "polowanie");
        }
        this._game.constructionService.lvlDownOrGetHurt(CONSTRUCTION.WEAPON, beast.weaponLoss, "polowanie");
        beast.applySpecialEffect();
        if (this._game.phaseService.phase === "action") {
            this._game.resourceService.addBasicResourcesToFuture(beast.reward, "polowanie");
        } else {
            this._game.resourceService.addBasicResourcesToOwned(beast.reward);
        }
        weapon.resetTemporaryBoost();
    }

    fightCustomBeast(leader: IPlayerCharacter, beastStats: BeastStats) {
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


    private getStrengthWithModifiers(beast: IBeast) {
        let strength = beast.strength;
        if (this._game.mysteryService.hasTresureCard(TREASURE_MYSTERY_CARD.HELMET)) {
            strength--;
        }
        return strength;
    }
}
