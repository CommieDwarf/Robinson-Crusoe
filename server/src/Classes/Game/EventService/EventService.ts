import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {
    IEventService,
    IEventServiceRenderData,
    ThreatSpecialEffects,
} from "@shared/types/Game/EventService/EventService";
import {IGame} from "@shared/types/Game/Game";
import {EventCardCreator} from "./EventCardCreator/EventCardCreator";
import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";
import {implementedEventCards} from "@shared/constants/cards/EventCards";
import {isEventCard} from "@shared/utils/typeGuards/isEventCard";
import {IMysteryCard} from "@shared/types/Game/MysteryService/MysteryCard";
import {isMysteryCard} from "@shared/utils/typeGuards/isMysteryCard";
import {isAdventureCard} from "@shared/utils/typeGuards/isAdventureCard";
import {EVENT_CARD, WRECKAGE_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import shuffle from "@shared/utils/shuffleArray";

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
            leftSlot: this.left?.renderData || null,
            rightSlot: this.right?.renderData || null,
            currentAdventureCard: this._currentAdventureCard?.renderData || null,
            currentMysteryCard: this._currentMysteryCard?.renderData || null,
        };
    }

    get specialEffects(): ThreatSpecialEffects {
        return this._specialEffects;
    }

    set left(card: IEventCard | null) {
        this._eventSlots.left = card;
    }

    set right(card: IEventCard | null) {
        this._eventSlots.right = card;
    }

    get left() {
        return this._eventSlots.left;
    }

    get right() {
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

    public fullFill(name: string) {
        this._eventSlots[this.getSlotByCardName(name)]?.fullFill();
        this.discardCard(name);
    }

    private discardCard(name: string) {
        this._eventSlots[this.getSlotByCardName(name)] = null;
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
        this.left?.triggerThreatEffect();
        this.left = null;

        this.left = this.right;
        this.right = null;
    }

    public addCardToTopOfStack(card: unknown) {
    }

    public shuffleCardInToDeck(card: IAdventureCard | IMysteryCard) {
        this._eventCardDeck.push(card);
        this._eventCardDeck = shuffle([...this._eventCardDeck], this._game.getRandomNumber);

    }

    public switchCardFromTopToBottomOfStack() {
    }

    public getSlotByCardName(cardName: string) {
        if (this.left?.name === cardName) {
            return "left";
        } else if (this.right?.name === cardName) {
            return "right";
        }

        throw new Error("There is no card with scenario: " + cardName + "in any slot");
    }

    public setSpecialEffect(
        effect: keyof ThreatSpecialEffects,
        value: boolean,
        logSource: string
    ) {
        this._specialEffects[effect] = value;
    }

    public resolveEventAdventure(option: 1 | 2) {

        this._currentAdventureCard?.triggerEventEffect();
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
        // this._eventSlots.right = creator.create(WRECKAGE_CARD.SUPPLY_CRATES);
        let cards = implementedEventCards.map((card) => creator.create(card));
        cards = shuffle(cards, this._game.getRandomNumber).slice(0, 11)
        cards.push(creator.create(WRECKAGE_CARD.CAPTAINS_CHEST));
        cards.push(creator.create(EVENT_CARD.AWFUL_WEATHER));
        // 29 kart ogólnie


        return [...cards];
    }

}
