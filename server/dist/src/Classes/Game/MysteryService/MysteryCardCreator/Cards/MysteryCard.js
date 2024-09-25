"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysteryCard = void 0;
class MysteryCard {
    constructor(game, name, shuffleable, eventName, eventLabel, drawLabel) {
        this._requiresTargeting = false;
        this._uses = 1;
        this._usedCount = 0;
        this._drawResolved = false;
        this._game = game;
        this._name = name;
        this._shuffleable = shuffleable;
        this._eventName = eventName;
        this._eventLabel = eventLabel;
        this._drawLabel = drawLabel;
    }
    getRenderData() {
        return {
            name: this._name,
            type: this._type,
            shuffleable: this._shuffleable,
            eventLabel: this._eventLabel,
            drawLabel: this._drawLabel,
            drawResolved: this._drawResolved,
            usedCount: this._usedCount,
        };
    }
    get uses() {
        return this._uses;
    }
    get eventName() {
        return this._eventName;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get shuffleable() {
        return this._shuffleable;
    }
    get requiresTarget() {
        return this._requiresTargeting;
    }
    get drawLabel() {
        return this._drawLabel;
    }
    set drawResolved(value) {
        this._drawResolved = value;
    }
    get drawResolved() {
        return this._drawResolved;
    }
    addCardAsReminder() {
        this._game.mysteryService.addCardAsReminder(this);
    }
    removeCardAsReminder() {
        this._game.mysteryService.removeCardAsReminder(this);
    }
    shuffleIntoEventDeck() {
        if (!this._shuffleable) {
            throw new Error("shuffleIntoEventDeck method is used but card is marked as unshuffleable. " +
                this._name);
        }
        this._game.eventService.shuffleCardInToDeck(this);
    }
    use(...args) {
        this._usedCount++;
    }
    triggerDrawEffect(drawer) {
    }
    triggerEventEffect() {
    }
}
exports.MysteryCard = MysteryCard;
//# sourceMappingURL=MysteryCard.js.map