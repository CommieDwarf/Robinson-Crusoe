"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysteryController = void 0;
const GameController_1 = require("../GameController");
const CONTROLLER_ACTION_1 = require("../../../shared/types/CONTROLLER_ACTION");
class MysteryController {
    constructor(game) {
        this._game = game;
    }
    getActionHandlers() {
        const handlers = new Map();
        handlers.set(CONTROLLER_ACTION_1.MYSTERY_CONTROLLER_ACTION.RESOLVE_EVENT_MYSTERY, this.resolveEventMystery.bind(this));
        handlers.set(CONTROLLER_ACTION_1.MYSTERY_CONTROLLER_ACTION.TRIGGER_MYSTERY_DRAW_EFFECT, this.triggerMysteryDrawEffect.bind(this));
        handlers.set(CONTROLLER_ACTION_1.MYSTERY_CONTROLLER_ACTION.USE_TREASURE_CARD, this.useTreasureCard.bind(this));
        handlers.set(CONTROLLER_ACTION_1.MYSTERY_CONTROLLER_ACTION.DRAW_MYSTERY_CARD, this.drawMysteryCard.bind(this));
        handlers.set(CONTROLLER_ACTION_1.MYSTERY_CONTROLLER_ACTION.FINISH_DRAWING_MYSTERY_CARDS, this.finishDrawingMysteryCards.bind(this));
        handlers.set(CONTROLLER_ACTION_1.MYSTERY_CONTROLLER_ACTION.MANAGE_CARD_STORAGE, this.manageCardStorage.bind(this));
        return handlers;
    }
    resolveEventMystery(player) {
        this._game.eventService.resolveEventMystery();
    }
    triggerMysteryDrawEffect(player) {
        this._game.mysteryService.triggerDrawEffect();
    }
    useTreasureCard(player, cardName) {
        this._game.mysteryService.useCard(player.getCharacter(), cardName);
    }
    drawMysteryCard(player) {
        this._game.mysteryService.drawCard();
    }
    finishDrawingMysteryCards(player) {
        this._game.mysteryService.finish();
    }
    manageCardStorage(player, cardName, action) {
        switch (action) {
            case GameController_1.STORAGE_ACTION.WITHDRAW:
                this._game.mysteryService.withdrawResource(cardName);
                break;
            case GameController_1.STORAGE_ACTION.DEPOSIT:
                this._game.mysteryService.depositResource(cardName);
                break;
        }
    }
}
exports.MysteryController = MysteryController;
//# sourceMappingURL=MysteryController.js.map