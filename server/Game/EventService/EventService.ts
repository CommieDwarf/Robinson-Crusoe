import {IEventCard} from "../../../interfaces/EventService/EventCard";
import {
    IEventService,
    IEventServiceRenderData,
    ThreatSpecialEffects,
} from "../../../interfaces/EventService/EventService";
import {IGame} from "../../../interfaces/Game";
import {EventCardCreator} from "./EventCardCreator/EventCardCreator";
import {EVENT_CARD} from "../../../interfaces/EventService/EVENT_CARD";
import {IAdventureCard} from "../../../interfaces/AdventureService/AdventureCard";
import {EventCard} from "./EventCardCreator/EventCard";
import shuffle from "../../../utils/shuffleArray";

interface EventSlots {
    left: null | IEventCard;
    right: null | IEventCard;
}

export class EventService implements IEventService {
    private _eventCardDeck: (IEventCard | IAdventureCard)[];

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
        const leftSlot = this.leftSlot ? this.leftSlot.renderData : null;
        const rightSlot = this.rightSlot ? this.rightSlot.renderData : null;
        return {
            leftSlot,
            rightSlot,
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
        card.triggerEventEffect();
        if (card instanceof EventCard) {
            this._eventSlots.right = card;
            card.setAdventureToken();
        }
    }

    public moveCardsLeft() {
        this.leftSlot?.triggerThreatEffect();
        this.leftSlot = null;

        this.leftSlot = this.rightSlot;
        this.rightSlot = null;
    }

    public addCardToTopOfStack(card: unknown) {
    }

    public shuffleCardInToDeck(card: IAdventureCard) {
        this._eventCardDeck.push(card);
        this._eventCardDeck = shuffle(this._eventCardDeck);
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

    private initEventCards(): IEventCard[] {
        const creator = new EventCardCreator(this._game);
        const cards = Object.values(EVENT_CARD).map((card) => creator.create(card));
        cards.push(creator.create(EVENT_CARD.DEVASTATION));
        cards.push(creator.create(EVENT_CARD.BROKEN_TREE));
        cards.push(creator.create(EVENT_CARD.DEVASTATION));
        return [...cards];
    }
}
