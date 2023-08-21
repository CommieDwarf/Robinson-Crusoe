import {IEventCard} from "../../../interfaces/EventService/EventCard";
import {
    IEventService,
    IEventServiceRenderData,
    ThreatSpecialEffects,
} from "../../../interfaces/EventService/EventService";
import {IGame} from "../../../interfaces/Game";
import {EventCardCreator} from "./EventCardCreator/EventCardCreator";
import {IAdventureCard} from "../../../interfaces/AdventureService/AdventureCard";
import {EventCard} from "./EventCardCreator/EventCard";
import shuffle from "../../../utils/shuffleArray";
import {implementedEventCards} from "../../../constants/cards/EventCards";
import { AdventureCardCreator } from "../AdventureService/AdventureCardCreator/Creators/AdventureCardCreator";
import { buildAdventureCards } from "../../../constants/cards/AdventureCards/build";
import { isEventCard } from "../../../utils/isEventCard";
import { IMysteryCard } from "../../../interfaces/MysteryService/MysteryCard";
import { isMysteryCard } from "../../../utils/isMysteryCard";
import { isAdventureCard } from "../../../utils/isAdventureCard";

interface EventSlots {
    left: null | IEventCard;
    right: null | IEventCard;
}

export class EventService implements IEventService {
    private _eventCardDeck: (IEventCard | IAdventureCard | IMysteryCard)[];
    private _currentAdventureCard: IAdventureCard | null = null;
    private _adventureNeedsToBeResolved: boolean = false;
    private _currentMysteryCard: IMysteryCard | null = null;
    private _lastRoundEventCardPulled: number = 0;

    private readonly _game: IGame;
    private _eventSlots: EventSlots = {
        left: null,
        right: null,
    };

    private _specialEffects: ThreatSpecialEffects = {
        argument: false,
    };

    constructor(game: IGame) {
        this._game = game;
        this._eventCardDeck = this.initEventCards();
        // this.testEventCards(Play);
    }

    get renderData(): IEventServiceRenderData {
        return {
            leftSlot: this.leftSlot?.renderData || null,
            rightSlot: this.rightSlot?.renderData || null, 
            currentAdventureCard: this._currentAdventureCard?.renderData || null,
            currentMysteryCard: this._currentMysteryCard?.getRenderData() || null,
        };
    }

    get specialEffects(): ThreatSpecialEffects {
        return this._specialEffects;
    }

    set leftSlot(card: IEventCard | null) {
        this._eventSlots.left = card;
    }

    set rightSlot(card: IEventCard | null) {
        this._eventSlots.right = card;
    }

    get leftSlot() {
        return this._eventSlots.left;
    }

    get rightSlot() {
        return this._eventSlots.right;
    }

    get currentAdventureCard() {
        return this._currentAdventureCard;
    }

    get adventureNeedsToBeResolved() {
        return this._adventureNeedsToBeResolved;
    }

    get currentMysteryCard() {
        return this._currentMysteryCard;
    }

    public getCardSlotByDroppableId(droppableId: string) {
        let card;
        if (droppableId.includes("left")) {
            card = this._eventSlots.left;
        } else if (droppableId.includes("right")) {
            card = this._eventSlots.right;
        }
        if (card) {
            return card;
        }
        throw new Error(
            "Couldn't find card in slot with droppable: " + droppableId
        );
    }

    public fullFill(id: string) {
        this._eventSlots[this.getSlotByCardID(id)]?.fullFill();
        this.discardCard(id);
    }

    private discardCard(id: string) {
        this._eventSlots[this.getSlotByCardID(id)] = null;
    }

    private setInitialCard(eventCards: IEventCard[]) {
        const wreckage = eventCards.shift();
        if (!wreckage) {
            throw new Error("eventCards are empty");
        }
        this._eventSlots.right = wreckage;
    }

    public pullCard() {
        let card = this._eventCardDeck.pop();
        if (!card) {
            throw new Error("There is no card to pull");
        }
        if (isEventCard(card)) {
            this.moveCardsLeft();
            this._eventSlots.right = card;
            this._currentAdventureCard = null;
            card.setAdventureToken();
            card.triggerEventEffect();
            this._lastRoundEventCardPulled = this._game.round;
        } else if (isAdventureCard(card)) {
            this._currentAdventureCard = card;
        } else if (isMysteryCard(card)) {
            this._currentMysteryCard = card;
        }
    }


    private moveCardsLeft() {
        this.leftSlot?.triggerThreatEffect();
        this.leftSlot = null;

        this.leftSlot = this.rightSlot;
        this.rightSlot = null;
    }

    public addCardToTopOfStack(card: unknown) {
    }

    public shuffleCardInToDeck(card: IAdventureCard | IMysteryCard) {
        this._eventCardDeck.push(card);

        // TODO: TEMPORARY COMMENTED FOR ADVENTURE CARD TESTING PURPOUSES
        // this._eventCardDeck = shuffle(this._eventCardDeck);
    }

    public switchCardFromTopToBottomOfStack() {
    }

    public getSlotByCardID(cardID: string) {
        if (this.leftSlot?.id === cardID) {
            return "left";
        } else if (this.rightSlot?.id === cardID) {
            return "right";
        }

        throw new Error("There is no card with id: " + cardID + "in any slot");
    }

    public setSpecialEffect(
        effect: keyof ThreatSpecialEffects,
        value: boolean,
        logSource: string
    ) {
        this._specialEffects[effect] = value;
        if (effect === "argument") {
            const color = value ? "red" : "green";
            const msg = value
                ? "przy zagrożeniu muszą być użyte pionki 2 innych postaci"
                : 'przy zagrożeniu nie muszą już być użyte pionki 2 innych postaci"';
            this._game.chatLog.addMessage(msg, color, logSource);
        }
    }

    public resolveEventAdventure(option: 1 | 2) {
        const options = this._currentAdventureCard?.eventOptions;
        if (options && options[option - 1].canBeResolved()) {
            options[option - 1].resolve();
        } else {
            throw new Error("cant be resolved.")
        }
  
        this._currentAdventureCard = null;
        this._adventureNeedsToBeResolved = false;
        this.pullCard();
    }

    public resolveEventMystery() {
        if (this._currentMysteryCard) {
            this._currentMysteryCard.triggerEventEffect();
            this._currentMysteryCard = null;
            this.pullCard();
        }
    }

    public canGoNextPhase() {
        return !this._currentAdventureCard && !this._currentMysteryCard;
    }

    public isEventCardPulledThisRound(): boolean {
        return this._game.round === this._lastRoundEventCardPulled;
    }

    private initEventCards(): IEventCard[] {
        const creator = new EventCardCreator(this._game);
        // const cards = Object.values(EVENT_CARD).map((card) => creator.create(card));
        // cards.push(creator.create(EVENT_CARD.DROUGHT));
        // cards.push(creator.create(EVENT_CARD.DEVASTATION));
        let implemented = implementedEventCards.slice(0, implementedEventCards.length - 1);
        console.log(implemented);
        const cards = implemented.map((card) => creator.create(card));
        return [...cards];
    }

}
