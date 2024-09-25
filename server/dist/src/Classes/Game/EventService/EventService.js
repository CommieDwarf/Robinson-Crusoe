"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const EventCardCreator_1 = require("./EventCardCreator/EventCardCreator");
const EventCards_1 = require("@shared/constants/cards/EventCards");
const isEventCard_1 = require("@shared/utils/typeGuards/isEventCard");
const isMysteryCard_1 = require("@shared/utils/typeGuards/isMysteryCard");
const isAdventureCard_1 = require("@shared/utils/typeGuards/isAdventureCard");
const EVENT_CARD_1 = require("@shared/types/Game/EventService/EVENT_CARD");
const shuffleArray_1 = __importDefault(require("@shared/utils/shuffleArray"));
class EventService {
    constructor(game) {
        this._currentAdventureCard = null;
        this._adventureNeedsToBeResolved = false;
        this._currentMysteryCard = null;
        this._lastRoundEventCardPulled = 0;
        this._eventSlots = {
            left: null,
            right: null,
        };
        this._specialEffects = {
            argument: false,
        };
        this._game = game;
        this._eventCardDeck = this.initEventCards();
        // this.testEventCards(Play);
    }
    get renderData() {
        var _a, _b, _c, _d;
        return {
            leftSlot: ((_a = this.left) === null || _a === void 0 ? void 0 : _a.renderData) || null,
            rightSlot: ((_b = this.right) === null || _b === void 0 ? void 0 : _b.renderData) || null,
            currentAdventureCard: ((_c = this._currentAdventureCard) === null || _c === void 0 ? void 0 : _c.renderData) || null,
            currentMysteryCard: ((_d = this._currentMysteryCard) === null || _d === void 0 ? void 0 : _d.renderData) || null,
        };
    }
    get specialEffects() {
        return this._specialEffects;
    }
    set left(card) {
        this._eventSlots.left = card;
    }
    set right(card) {
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
    getCardSlotByDroppableId(droppableId) {
        let card;
        if (droppableId.includes("left")) {
            card = this._eventSlots.left;
        }
        else if (droppableId.includes("right")) {
            card = this._eventSlots.right;
        }
        if (card) {
            return card;
        }
        throw new Error("Couldn't find card in slot with droppable: " + droppableId);
    }
    fullFill(name) {
        var _a;
        (_a = this._eventSlots[this.getSlotByCardName(name)]) === null || _a === void 0 ? void 0 : _a.fullFill();
        this.discardCard(name);
    }
    discardCard(name) {
        this._eventSlots[this.getSlotByCardName(name)] = null;
    }
    setInitialCard(eventCards) {
        const wreckage = eventCards.shift();
        if (!wreckage) {
            throw new Error("eventCards are empty");
        }
        this._eventSlots.right = wreckage;
    }
    pullCard() {
        let card = this._eventCardDeck.pop();
        if (!card) {
            throw new Error("There is no card to pull");
        }
        if ((0, isEventCard_1.isEventCard)(card)) {
            this.moveCardsLeft();
            this._eventSlots.right = card;
            this._currentAdventureCard = null;
            card.setAdventureToken();
            card.triggerEventEffect();
            this._lastRoundEventCardPulled = this._game.round;
        }
        else if ((0, isAdventureCard_1.isAdventureCard)(card)) {
            this._currentAdventureCard = card;
        }
        else if ((0, isMysteryCard_1.isMysteryCard)(card)) {
            this._currentMysteryCard = card;
        }
    }
    moveCardsLeft() {
        var _a;
        (_a = this.left) === null || _a === void 0 ? void 0 : _a.triggerThreatEffect();
        this.left = null;
        this.left = this.right;
        this.right = null;
    }
    addCardToTopOfStack(card) {
    }
    shuffleCardInToDeck(card) {
        this._eventCardDeck.push(card);
        this._eventCardDeck = (0, shuffleArray_1.default)([...this._eventCardDeck], this._game.getRandomNumber);
    }
    switchCardFromTopToBottomOfStack() {
    }
    getSlotByCardName(cardName) {
        var _a, _b;
        if (((_a = this.left) === null || _a === void 0 ? void 0 : _a.name) === cardName) {
            return "left";
        }
        else if (((_b = this.right) === null || _b === void 0 ? void 0 : _b.name) === cardName) {
            return "right";
        }
        throw new Error("There is no card with scenario: " + cardName + "in any slot");
    }
    setSpecialEffect(effect, value, logSource) {
        this._specialEffects[effect] = value;
    }
    resolveEventAdventure(option) {
        var _a;
        (_a = this._currentAdventureCard) === null || _a === void 0 ? void 0 : _a.triggerEventEffect();
        this._currentAdventureCard = null;
        this._adventureNeedsToBeResolved = false;
        this.pullCard();
    }
    resolveEventMystery() {
        if (this._currentMysteryCard) {
            this._currentMysteryCard.triggerEventEffect();
            this._currentMysteryCard = null;
            this.pullCard();
        }
    }
    canGoNextPhase() {
        return !this._currentAdventureCard && !this._currentMysteryCard;
    }
    isEventCardPulledThisRound() {
        return this._game.round === this._lastRoundEventCardPulled;
    }
    initEventCards() {
        const creator = new EventCardCreator_1.EventCardCreator(this._game);
        // this._eventSlots.right = creator.create(WRECKAGE_CARD.SUPPLY_CRATES);
        let cards = EventCards_1.implementedEventCards.map((card) => creator.create(card));
        cards = (0, shuffleArray_1.default)(cards, this._game.getRandomNumber).slice(0, 11);
        cards.push(creator.create(EVENT_CARD_1.WRECKAGE_CARD.CAPTAINS_CHEST));
        cards.push(creator.create(EVENT_CARD_1.EVENT_CARD.AWFUL_WEATHER));
        // 29 kart ogólnie
        return [...cards];
    }
}
exports.EventService = EventService;
//# sourceMappingURL=EventService.js.map