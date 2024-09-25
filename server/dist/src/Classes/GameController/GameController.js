"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = exports.STORAGE_ACTION = void 0;
const TileController_1 = require("./TileController/TileController");
const MysteryController_1 = require("./MysteryController/MysteryController");
const CharacterController_1 = require("./CharacterController/CharacterController");
const ActionController_1 = require("./ActionController/ActionController");
const CONTROLLER_ACTION_1 = require("@shared/types/CONTROLLER_ACTION");
var STORAGE_ACTION;
(function (STORAGE_ACTION) {
    STORAGE_ACTION["WITHDRAW"] = "withdraw";
    STORAGE_ACTION["DEPOSIT"] = "deposit";
})(STORAGE_ACTION || (exports.STORAGE_ACTION = STORAGE_ACTION = {}));
class GameController {
    constructor(game, players) {
        this._actionHandlers = new Map();
        this._game = game;
        this._players = players;
        this.initActionHandlers();
        this.testStuff();
    }
    get game() {
        return this._game;
    }
    loadBySteps(steps) {
        steps.forEach((step) => {
            this.handleAction(step.action, this.getPlayerByUserId(step.userId), ...step.args);
        });
    }
    handleAction(action, player, ...args) {
        const handler = this._actionHandlers.get(action);
        if (!handler) {
            throw new Error(`There isn't matching handler to: ${action}.`);
        }
        handler(player, ...args);
    }
    testStuff() {
        const char = this._game.characterService.playerCharacters[0];
    }
    initActionHandlers() {
        this.addActionHandlers(new TileController_1.TileController(this._game));
        this.addActionHandlers(new MysteryController_1.MysteryController(this._game));
        this.addActionHandlers(new CharacterController_1.CharacterController(this._game));
        this.addActionHandlers(new ActionController_1.ActionController(this._game));
        this.addActionHandlers(this);
    }
    addActionHandlers(controller) {
        controller.getActionHandlers().forEach((handler, action) => {
            this._actionHandlers.set(action, handler);
        });
    }
    getActionHandlers() {
        const handlers = new Map();
        handlers.set(CONTROLLER_ACTION_1.OTHER_CONTROLLER_ACTION.ADD_WOOD_TO_PILE, this.addWoodToPile.bind(this));
        handlers.set(CONTROLLER_ACTION_1.OTHER_CONTROLLER_ACTION.RESOLVE_EVENT_ADVENTURE, this.resolveEventAdventure.bind(this));
        handlers.set(CONTROLLER_ACTION_1.OTHER_CONTROLLER_ACTION.ROLL_WEATHER_DICES, this.rollWeatherDices.bind(this));
        handlers.set(CONTROLLER_ACTION_1.OTHER_CONTROLLER_ACTION.SET_NEXT_PHASE, this.setNextPhase.bind(this));
        handlers.set(CONTROLLER_ACTION_1.OTHER_CONTROLLER_ACTION.SWITCH_COMMITTED_RESOURCES_TYPE, this.switchCommittedResourcesType.bind(this));
        handlers.set(CONTROLLER_ACTION_1.OTHER_CONTROLLER_ACTION.USE_INVENTION, this.useInvention.bind(this));
        handlers.set(CONTROLLER_ACTION_1.OTHER_CONTROLLER_ACTION.USE_ITEM, this.useItem.bind(this));
        handlers.set(CONTROLLER_ACTION_1.OTHER_CONTROLLER_ACTION.USE_DISCOVERY_TOKEN, this.useDiscoveryToken.bind(this));
        handlers.set(CONTROLLER_ACTION_1.OTHER_CONTROLLER_ACTION.PICK_OBJECT, this.pickObject.bind(this));
        return handlers;
    }
    addWoodToPile(player) {
        this._game.scenarioService.addWood(player.getCharacter());
    }
    resolveEventAdventure(player, option) {
        this._game.eventService.resolveEventAdventure(option);
    }
    rollWeatherDices(player) {
        this._game.weatherService.rollDices();
    }
    setNextPhase(player) {
        this._game.phaseService.goNextPhase();
    }
    switchCommittedResourcesType(player, construction) {
        this._game.constructionService.switchCommittedResources(construction);
    }
    useInvention(player, inventionName) {
        this._game.inventionService.useInvention(inventionName, player.getCharacter());
    }
    useItem(player, item) {
        this._game.equipmentService.useItem(item, player.getCharacter());
    }
    useDiscoveryToken(player, tokenId) {
        this._game.tokenService.useToken(tokenId, player.getCharacter());
    }
    pickObject(player, objPickerId, objectIds, secondaryEffect) {
        this._game.pickObjects(objPickerId, objectIds, secondaryEffect);
    }
    getPlayerByUserId(userId) {
        const player = this._players.find((player) => player.user.id === userId);
        if (!player) {
            throw new Error("Player not found");
        }
        return player;
    }
}
exports.GameController = GameController;
//# sourceMappingURL=GameController.js.map