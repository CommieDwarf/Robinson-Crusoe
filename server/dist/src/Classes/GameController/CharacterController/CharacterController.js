"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const CONTROLLER_ACTION_1 = require("@shared/types/CONTROLLER_ACTION");
class CharacterController {
    constructor(game) {
        this._game = game;
    }
    getActionHandlers() {
        const handlers = new Map();
        handlers.set(CONTROLLER_ACTION_1.CHARACTER_CONTROLLER_ACTION.MOVE_PAWN, this.movePawn.bind(this));
        handlers.set(CONTROLLER_ACTION_1.CHARACTER_CONTROLLER_ACTION.REMOVE_HEALTH_THRESHOLD, this.removeHealthThreshold.bind(this));
        handlers.set(CONTROLLER_ACTION_1.CHARACTER_CONTROLLER_ACTION.USE_ABILITY, this.useAbility.bind(this));
        return handlers;
    }
    movePawn(player, source, target) {
        this._game.globalPawnService.handlePawnMovement(source, target);
    }
    removeHealthThreshold(player, num) {
        this._game.characterService.removeMoraleThreshold(player.getCharacter(), num);
    }
    useAbility(player, character, ability, target) {
        this._game.characterService.getCharacter(character).useAbility(ability, target);
    }
}
exports.CharacterController = CharacterController;
//# sourceMappingURL=CharacterController.js.map