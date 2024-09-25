"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdventureCard = void 0;
class AdventureCard {
    constructor(name, eventName, shouldDecide, game, option1Label, option2Label) {
        this._eventOption1 = null;
        this._eventOption2 = null;
        this._resolver = null;
        this._name = name;
        this._eventName = eventName;
        this._shouldDecide = shouldDecide;
        this._game = game;
        this._option1Label = option1Label;
        this._option2Label = option2Label;
    }
    get renderData() {
        return {
            name: this._name,
            shouldDecide: this._shouldDecide,
            action: this._action,
            option1Label: this._option1Label,
            option2Label: this._option2Label,
            eventOption1: this._eventOption1 && this.getEventOptionRenderData(this._eventOption1),
            eventOption2: this._eventOption2 && this.getEventOptionRenderData(this._eventOption2)
        };
    }
    get eventOption1() {
        return this._eventOption1;
    }
    get eventOption2() {
        return this._eventOption2;
    }
    get option1Label() {
        return this._option1Label;
    }
    get option2Label() {
        return this._option2Label;
    }
    get action() {
        return this._action;
    }
    get shouldDecide() {
        return this._shouldDecide;
    }
    get name() {
        return this._name;
    }
    get eventName() {
        return this._eventName;
    }
    getEventOptionRenderData(eventOption) {
        return {
            label: eventOption.label,
        };
    }
    resolveOption1(resolver) {
    }
    resolveOption2(resolver) {
        if (!this._shouldDecide) {
            throw new Error("Option2 method is triggered but card is marked as shouldn't decide" +
                this._name);
        }
    }
    startDrawingMysteryCards(creature, trap, treasure, resolver, max = Infinity) {
        this._game.mysteryService.startDrawingCards(creature, trap, treasure, resolver, max);
    }
    triggerEventEffect() {
    }
    setResolver(resolver) {
        this._resolver = resolver;
    }
    getResolver() {
        if (!this._resolver) {
            throw new Error("Resolver is null.");
        }
        return this._resolver;
    }
    shuffleIntoEventDeck() {
        this._game.eventService.shuffleCardInToDeck(this);
    }
    getPrimeCharacter() {
        return this._game.playerService.primePlayer.getCharacter();
    }
}
exports.AdventureCard = AdventureCard;
//# sourceMappingURL=AdventureCard.js.map