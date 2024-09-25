"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysteryService = void 0;
const MysteryCardCreator_1 = require("./MysteryCardCreator/MysteryCardCreator");
const shuffleArray_1 = __importDefault(require("../../../shared/utils/shuffleArray"));
const MysteryCardDrawer_1 = require("./MysteryCardDrawer");
const Barrel_1 = require("./MysteryCardCreator/Cards/Treasure/Barrel");
const isTreasureCard_1 = require("../../../shared/utils/typeGuards/isTreasureCard");
class MysteryService {
    constructor(game) {
        this._cardsAsReminders = [];
        this._cardDrawer = null;
        this._currentResolve = null;
        this._currentCardThatRequiresTarget = null;
        this._cardToBeResolved = null;
        this._game = game;
        this._cardStack = this.initCards();
    }
    get renderData() {
        var _a, _b, _c, _d, _e, _f, _g;
        return {
            isDrawingOn: this.isDrawingOn,
            canDraw: ((_a = this._cardDrawer) === null || _a === void 0 ? void 0 : _a.canDraw) || false,
            currentResolve: ((_b = this._currentResolve) === null || _b === void 0 ? void 0 : _b.renderData) || null,
            canFinish: ((_c = this._cardDrawer) === null || _c === void 0 ? void 0 : _c.canFinish) || false,
            drawer: ((_d = this._cardDrawer) === null || _d === void 0 ? void 0 : _d.drawer.renderData) || null,
            cardsLeft: {
                creature: ((_e = this._cardDrawer) === null || _e === void 0 ? void 0 : _e.creature) || 0,
                trap: ((_f = this._cardDrawer) === null || _f === void 0 ? void 0 : _f.trap) || 0,
                treasure: ((_g = this._cardDrawer) === null || _g === void 0 ? void 0 : _g.treasure) || 0,
            },
            cardsAsReminders: this._cardsAsReminders.map((card) => card.renderData),
        };
    }
    get isDrawingOn() {
        return Boolean(this._cardDrawer);
    }
    get cardsAsReminders() {
        return this._cardsAsReminders;
    }
    get cardStack() {
        return this._cardStack;
    }
    useCard(user, cardName, target1, target2) {
        const card = this.getOwnedMysteryCard(cardName);
        if (typeof user === "string") {
            user = this._game.characterService.getCharacter(user);
        }
        if (!(0, isTreasureCard_1.isTreasureCard)(card)) {
            return;
        }
        //TODO: think about targeting
        if (card.requiresTarget && this._currentCardThatRequiresTarget !== card) {
            this._currentCardThatRequiresTarget = card;
        }
        else {
            card.use(user, target1, target2);
        }
    }
    addTreasureToResources(card) {
        card.addToResources();
    }
    addCardAsReminder(card) {
        this._cardsAsReminders.push(card);
    }
    removeCardAsReminder(card) {
        this._cardsAsReminders = this._cardsAsReminders.filter((c) => card.name !== c.name);
    }
    initCards() {
        const creator = new MysteryCardCreator_1.MysteryCardCreator(this._game);
        const implemented = creator.implemented;
        const cards = [
            ...implemented.treasure.map((card) => creator.createTreasureCard(card)),
            ...implemented.trap.map((card) => creator.createTrapCard(card)),
            ...implemented.creature.map((card) => creator.createCreatureCard(card))
        ];
        return (0, shuffleArray_1.default)(cards, this._game.getRandomNumber);
    }
    shuffleBackIntoStack(cards) {
        this._cardStack = (0, shuffleArray_1.default)(this._cardStack.concat(cards), this._game.getRandomNumber);
    }
    startDrawingCards(creature, trap, treasure, drawer, max = Infinity) {
        this._cardDrawer = new MysteryCardDrawer_1.MysteryCardDrawer(this, creature, trap, treasure, drawer, max);
    }
    depositResource(cardName) {
        const card = this.getOwnedMysteryCard(cardName);
        if (card instanceof Barrel_1.Barrel) {
            card.deposit();
        }
    }
    withdrawResource(cardName) {
        const card = this.getOwnedMysteryCard(cardName);
        if (card instanceof Barrel_1.Barrel) {
            card.withdraw();
        }
    }
    drawCard() {
        if (!this._cardDrawer) {
            throw new Error("card drawer isn't instanced");
        }
        if (!this._cardDrawer.finished) {
            const card = this._cardDrawer.drawCard();
            this._currentResolve = card;
            if (!card.drawLabel) {
                card.triggerDrawEffect(this._cardDrawer.drawer);
                card.drawResolved = true;
            }
            else {
                this._cardToBeResolved = card;
            }
        }
    }
    hasTreasureCard(name) {
        let card = this._cardsAsReminders.find((c) => c.name === name);
        if (!card) {
            card = this._game.resourceService.owned.treasures.find((c) => c.name === name);
        }
        return Boolean(card);
    }
    triggerDrawEffect() {
        var _a;
        if (!this._cardDrawer) {
            throw new Error("Card drawer isn't instanced");
        }
        (_a = this._cardToBeResolved) === null || _a === void 0 ? void 0 : _a.triggerDrawEffect(this._cardDrawer.drawer);
        this._cardToBeResolved = null;
        this._currentResolve = null;
    }
    finish() {
        if (!this._cardDrawer) {
            throw new Error("card drawer isn't instanced");
        }
        if (this._cardDrawer.canFinish) {
            this._cardDrawer.finish();
            this._cardDrawer = null;
            this._currentResolve = null;
        }
    }
    disableFurtherCardDraw() {
        var _a;
        (_a = this._cardDrawer) === null || _a === void 0 ? void 0 : _a.disableDrawingCards();
    }
    dropTreasures() {
        var _a;
        (_a = this._cardDrawer) === null || _a === void 0 ? void 0 : _a.acquiredTreasures.forEach((card) => {
            this._game.resourceService.removeTreasureFromFuture(card);
            this._game.resourceService.removeTreasureFromOwned(card);
        });
    }
    getOwnedMysteryCard(name) {
        return this._game.resourceService.getOwnedTreasureMysteryCard(name);
    }
}
exports.MysteryService = MysteryService;
//# sourceMappingURL=MysteryService.js.map