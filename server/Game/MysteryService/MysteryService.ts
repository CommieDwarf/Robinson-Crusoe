import {IMysteryCard} from "../../../interfaces/MysteryService/MysteryCard";
import {MysteryCardCreator} from "./MysteryCardCreator/MysteryCardCreator";
import {IGame} from "../../../interfaces/Game";
import shuffle from "../../../utils/shuffleArray";
import {IMysteryService} from "../../../interfaces/MysteryService/MysteryService";
import {IMysteryCardDrawer} from "../../../interfaces/MysteryService/MysteryCardDrawer";
import {MysteryCardDrawer} from "./MysteryCardDrawer";
import {TREASURE_MYSTERY_CARD} from "../../../interfaces/MysteryService/MYSTERY_CARD";
import {IPlayerCharacter} from "../../../interfaces/Characters/PlayerCharacter";
import {Barrel} from "./MysteryCardCreator/Cards/Treasure/Barrel";
import {ICharacter} from "../../../interfaces/Characters/Character";


export class MysteryService implements IMysteryService {
    private readonly _game: IGame;
    private _cardsAsReminders: IMysteryCard[] = [];
    private _cardStack: IMysteryCard[];
    private _cardDrawer: null | IMysteryCardDrawer = null;
    private _currentResolve: null | IMysteryCard = null;
    private _currentCardThatRequiresTarget: null | IMysteryCard = null;
    private _cardToBeResolved: null | IMysteryCard = null;

    constructor(game: IGame) {
        this._game = game;
        this._cardStack = this.initCards();
    }

    get renderData() {
        return {
            isDrawingOn: this.isDrawingOn,
            canDraw: this._cardDrawer?.canDraw || false,
            currentResolve: this._currentResolve?.getRenderData() || null,
            canFinish: this._cardDrawer?.canFinish || false,
            drawer: this._cardDrawer?.drawer.renderData || null,
            cardsLeft: {
                creature: this._cardDrawer?.creature || 0,
                trap: this._cardDrawer?.trap || 0,
                treasure: this._cardDrawer?.treasure || 0,
            },
            cardsAsReminders: this._cardsAsReminders.map((card) => card.getRenderData()),
        };
    }

    get currentCardThatRequiresTarget(): IMysteryCard | null {
        return this._currentCardThatRequiresTarget;
    }

    set currentCardThatRequiresTarget(value: IMysteryCard | null) {
        this._currentCardThatRequiresTarget = value;
    }

    get isDrawingOn(): boolean {
        return Boolean(this._cardDrawer);
    }

    get cardsAsReminders(): IMysteryCard[] {
        return this._cardsAsReminders;
    }

    get cardStack(): IMysteryCard[] {
        return this._cardStack;
    }


    startTargeting() {
    }

    public useCard(user: IPlayerCharacter | string, cardName: string, target1?: any, target2?: any) {
        const card = this.getOwnedTreasureCard(cardName);
        if (typeof user === "string") {
            user = this._game.characterService.getCharacter(user) as IPlayerCharacter;
        }
        if (card.requiresTarget && this._currentCardThatRequiresTarget !== card) {
            this._currentCardThatRequiresTarget = card;
        } else {
            card.use(user, target1, target2);
        }
    }

    public addTreasureToFutureResources(card: IMysteryCard) {
        this._game.resourceService.addTreasureToFuture(card);
    }

    public addTreasureToOwnedResources(card: IMysteryCard) {
        this._game.resourceService.addTreasureToOwned(card);
    }

    public addCardAsReminder(card: IMysteryCard) {
        this._cardsAsReminders.push(card);
    }

    public removeCardAsReminder(card: IMysteryCard) {
        this._cardsAsReminders = this._cardsAsReminders.filter((c) => card.name !== c.name);
    }


    private initCards() {
        const creator = new MysteryCardCreator(this._game);
        const implemented = creator.implemented;
        const cards = [
            ...implemented.treasure.map((card) => creator.createTreasureCard(card)),
            ...implemented.trap.map((card) => creator.createTrapCard(card)),
            ...implemented.creature.map((card) => creator.createCreatureCard(card))
        ]
        return shuffle(cards);
    }

    public shuffleBackIntoStack(cards: IMysteryCard[]) {
        this._cardStack = shuffle(this._cardStack.concat(cards));
    }

    public startDrawingCards(
        creature: number,
        trap: number,
        treasure: number,
        drawer: ICharacter,
        max: number = Infinity,
    ) {
        this._cardDrawer = new MysteryCardDrawer(
            this,
            creature,
            trap,
            treasure,
            drawer,
            max
        );
    }

    public depositResource(cardName: string) {
        const card = this.getOwnedTreasureCard(cardName);
        if (card instanceof Barrel) {
            card.deposit();
        }
    }

    public withdrawResource(cardName: string) {
        const card = this.getOwnedTreasureCard(cardName);
        if (card instanceof Barrel) {
            card.withdraw();
        }
    }

    public drawCard() {
        if (!this._cardDrawer) {
            throw new Error("card drawer isn't instanced");
        }
        if (!this._cardDrawer.finished) {
            const card = this._cardDrawer.drawCard();
            this._currentResolve = card;
            if (!card.drawLabel) {
                card.triggerDrawEffect(this._cardDrawer.drawer);
                card.drawResolved = true;
                console.log("resolved true")
            } else {
                this._cardToBeResolved = card;
                console.log("to be resolved");
            }
        }
    }

    public hasTreasureCard(name: TREASURE_MYSTERY_CARD) {
        let card = this._cardsAsReminders.find((c) => c.name === name);
        if (!card) {
            card = this._game.resourceService.owned.treasures.find((c) => c.name === name);
        }
        return Boolean(card);
    }

    public triggerDrawEffect() {
        if (!this._cardDrawer) {
            throw new Error("Card drawer isn't instanced");
        }
        this._cardToBeResolved?.triggerDrawEffect(this._cardDrawer.drawer);
        this._cardToBeResolved = null;
        this._currentResolve = null;
    }

    public finish() {
        if (!this._cardDrawer) {
            throw new Error("card drawer isn't instanced");
        }
        if (this._cardDrawer.canFinish) {
            this._cardDrawer.finish();
            this._cardDrawer = null;
            this._currentResolve = null;
        }
    }

    public disableFurtherCardDraw() {
        this._cardDrawer?.disableDrawingCards();
    }

    public dropTreasures() {
        this._cardDrawer?.acquiredTreasures.forEach((card) => {
            this._game.resourceService.removeTreasureFromFuture(card);
            this._game.resourceService.removeTreasureFromOwned(card);
        })
    }


    private getOwnedTreasureCard(name: string) {
        return this._game.resourceService.getOwnedTreasureMysteryCard(name);
    }
}
