"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionController = void 0;
const CONTROLLER_ACTION_1 = require("@shared/types/CONTROLLER_ACTION");
class ActionController {
    constructor(game) {
        this._game = game;
    }
    getActionHandlers() {
        const handlers = new Map();
        handlers.set(CONTROLLER_ACTION_1.ACTION_CONTROLLER_ACTION.SET_BIBLE_USAGE, this.setBibleUsage.bind(this));
        handlers.set(CONTROLLER_ACTION_1.ACTION_CONTROLLER_ACTION.SET_NEXT_ACTION, this.setNextAction.bind(this));
        handlers.set(CONTROLLER_ACTION_1.ACTION_CONTROLLER_ACTION.ROLL_ACTION_DICES, this.rollActionDices.bind(this));
        handlers.set(CONTROLLER_ACTION_1.ACTION_CONTROLLER_ACTION.RESOLVE_ACTION, this.resolveAction.bind(this));
        handlers.set(CONTROLLER_ACTION_1.ACTION_CONTROLLER_ACTION.RESOLVE_ADVENTURE, this.resolveAdventure.bind(this));
        handlers.set(CONTROLLER_ACTION_1.ACTION_CONTROLLER_ACTION.REROLL_SUCCESS, this.reRollSuccess.bind(this));
        handlers.set(CONTROLLER_ACTION_1.ACTION_CONTROLLER_ACTION.REROLL_ACTION_DICE, this.reRollActionDice.bind(this));
        return handlers;
    }
    setBibleUsage(player, actionId, value) {
        this._game.actionService.setBibleUsage(actionId, value);
    }
    setNextAction(player) {
        this._game.actionService.setNextAction();
    }
    rollActionDices(player, actionId) {
        this._game.actionService.rollDices(actionId);
    }
    resolveAction(player, actionId) {
        this._game.actionService.resolve(actionId);
    }
    resolveAdventure(player, option) {
        this._game.adventureService.resolveAdventureCard(option, player.getCharacter().name);
    }
    reRollSuccess(player, resolvableItemID) {
        this._game.actionService.reRollSuccess(resolvableItemID);
    }
    reRollActionDice(player, dice) {
        this._game.actionService.reRollDice(dice);
    }
}
exports.ActionController = ActionController;
//# sourceMappingURL=ActionController.js.map