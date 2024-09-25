"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameClass = void 0;
const EventService_1 = require("./EventService/EventService");
const ActionSlotService_1 = require("./ActionSlotsService/ActionSlotService");
const TileService_1 = require("./TileService/TileService");
const ResourceService_1 = require("./ResourceService/ResourceService");
const ConstructionService_1 = require("./ConstructionService/ConstructionService");
const InventionsService_1 = require("./Inventions/InventionsService");
const Equipment_1 = require("./Equipment/Equipment");
const BeastService_1 = require("./BeastService/BeastService");
const CharacterService_1 = require("./CharacterService/CharacterService");
const MoraleService_1 = require("./MoraleService/MoraleService");
const WeatherService_1 = require("./WeatherService/WeatherService");
const PlayerService_1 = require("./PlayerService/PlayerService");
const ActionService_1 = require("./ActionService/ActionService");
const PhaseService_1 = require("./PhaseService/PhaseService");
const LogService_1 = require("./LogService/LogService");
const AlertService_1 = require("./AlertService/AlertService");
const ArrangeCampRestService_1 = require("./ArrangeCampRestService/ArrangeCampRestService");
const Castaways_1 = require("./Scenario/Castaways");
const TokenService_1 = require("./TokenService/TokenService");
const AdventureService_1 = require("./AdventureService/AdventureService");
const MysteryService_1 = require("./MysteryService/MysteryService");
const Game_1 = require("../../shared/types/Game/Game");
const LOG_CODE_1 = require("../../shared/types/Game/ChatLog/LOG_CODE");
const ObjectPicker_1 = require("./ObjectPicker/ObjectPicker");
const GlobalPawnService_1 = require("./GlobalPawnService/GlobalPawnService");
const seedrandom_1 = __importDefault(require("seedrandom"));
const uuidv4_1 = require("uuidv4");
class GameClass {
    get id() {
        return this._id;
    }
    constructor(players, loadData) {
        this._round = 1;
        this._gameStatus = Game_1.GAME_STATUS.IN_PROGRESS;
        this._objectPickers = [];
        this.randomCounter = 0;
        this.getRandomNumber = () => {
            this.randomCounter++;
            return this._rng();
        };
        players.forEach((player) => {
            player.initCharacter(this);
            player.ready = false;
        });
        this._seed = (loadData === null || loadData === void 0 ? void 0 : loadData.seed) || (0, uuidv4_1.uuid)();
        this._id = (loadData === null || loadData === void 0 ? void 0 : loadData.id) || (0, uuidv4_1.uuid)();
        this._rng = (0, seedrandom_1.default)("DUPA");
        this._actionService = new ActionService_1.ActionService(this);
        this._phaseService = new PhaseService_1.PhaseService(this);
        this._logService = new LogService_1.LogService(this);
        this._playerService = new PlayerService_1.PlayerService(players, this);
        this._resourceService = new ResourceService_1.ResourceService(this);
        this._constructionService = new ConstructionService_1.ConstructionService(this);
        this._alertService = new AlertService_1.AlertService();
        this._weatherService = new WeatherService_1.WeatherService(this);
        this._eventService = new EventService_1.EventService(this);
        this._tileService = new TileService_1.TileService(this, 7);
        this._characterService = new CharacterService_1.CharacterService(players.map((player) => player.getCharacter()), this);
        this._inventionService = new InventionsService_1.InventionsService("castaways", this.tileService, this);
        this._equipmentService = new Equipment_1.Equipment(this);
        this._arrangeCampRestService = new ArrangeCampRestService_1.ArrangeCampRestService(this);
        this._beastService = new BeastService_1.BeastService(this);
        this._actionSlotService = new ActionSlotService_1.ActionSlotService(this);
        this._moraleService = new MoraleService_1.MoraleService(this);
        this._round = 1;
        this._scenarioService = new Castaways_1.Castaways(this);
        this._tokenService = new TokenService_1.TokenService(this);
        this._adventureService = new AdventureService_1.AdventureService(this);
        this._mysteryService = new MysteryService_1.MysteryService(this);
        this._globalPawnService = new GlobalPawnService_1.GlobalPawnService(this);
    }
    get renderData() {
        return {
            characterService: this._characterService.renderData,
            resourceService: this.resourceService.renderData,
            arrangeCampRestService: this._arrangeCampRestService.renderData,
            beastService: this.beastService.renderData,
            equipmentService: this.equipmentService.renderData,
            inventionService: this.inventionService.renderData,
            players: this._playerService.renderData,
            constructionService: this.constructionService.renderData,
            eventService: this.eventService.renderData,
            tileService: this.tileService.renderData,
            phaseService: this._phaseService.renderData,
            moraleService: this._moraleService.renderData,
            round: this.round,
            logs: this.logService.renderData,
            actionService: this.actionService.renderData,
            alertService: this.alertService.renderData,
            scenarioService: this._scenarioService.renderData,
            weatherService: this._weatherService.renderData,
            globalPawnService: this.globalPawnService.renderData,
            tokenService: this._tokenService.renderData,
            adventureService: this._adventureService.renderData,
            mysteryService: this._mysteryService.renderData,
            actionSlotService: this._actionSlotService.renderData,
            objectPickers: this._objectPickers.map((objPicker) => objPicker.renderData),
            primePlayer: this._playerService.primePlayer.renderData,
        };
    }
    get mysteryService() {
        return this._mysteryService;
    }
    get adventureService() {
        return this._adventureService;
    }
    get actionSlotService() {
        return this._actionSlotService;
    }
    get tokenService() {
        return this._tokenService;
    }
    get weatherService() {
        return this._weatherService;
    }
    get scenarioService() {
        return this._scenarioService;
    }
    get arrangeCampRestService() {
        return this._arrangeCampRestService;
    }
    get actionSlotRenderData() {
        return this._actionSlotService.renderData;
    }
    get alertService() {
        return this._alertService;
    }
    get characterService() {
        return this._characterService;
    }
    get logService() {
        return this._logService;
    }
    get round() {
        return this._round;
    }
    get actionService() {
        return this._actionService;
    }
    get phaseService() {
        return this._phaseService;
    }
    get playerService() {
        return this._playerService;
    }
    get moraleService() {
        return this._moraleService;
    }
    get tileService() {
        return this._tileService;
    }
    get resourceService() {
        return this._resourceService;
    }
    get constructionService() {
        return this._constructionService;
    }
    get inventionService() {
        return this._inventionService;
    }
    get eventService() {
        return this._eventService;
    }
    get equipmentService() {
        return this._equipmentService;
    }
    get beastService() {
        return this._beastService;
    }
    get globalPawnService() {
        return this._globalPawnService;
    }
    get gameStatus() {
        return this._gameStatus;
    }
    get areObjectsBeingPicked() {
        return this._objectPickers.length !== 0;
    }
    get seed() {
        return this._seed;
    }
    startPickingObject(objects, picker, amount, source, pickSubject, pickEffect, secondaryEffect) {
        const mappedObjects = objects.map(obj => {
            if (typeof obj !== "object") {
                return { name: obj };
            }
            else {
                return obj;
            }
        });
        this._objectPickers.push(new ObjectPicker_1.ObjectPicker(this, mappedObjects, picker, amount, source, pickSubject, pickEffect, secondaryEffect));
    }
    pickObjects(pickerId, objectIds, secondaryEffect) {
        const objPicker = this._objectPickers.find((objectPicker) => objectPicker.id === pickerId);
        if (objPicker) {
            objPicker.pick(objectIds, secondaryEffect);
            this._objectPickers = this._objectPickers.filter((objPicker) => pickerId !== objPicker.id);
        }
        else {
            throw new Error("objPicker is missing");
        }
    }
    setNextRound() {
        this._round++;
    }
    setGameStatus(status, logSource = "") {
        this._gameStatus = status;
        if (status === Game_1.GAME_STATUS.LOST) {
            this._logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.GAME_LOST,
                subject1: "",
                subject2: "",
                amount: 0,
            }, "negative", logSource);
        }
        else {
            this._logService.addMessage({
                code: LOG_CODE_1.LOG_CODE.GAME_WON,
                subject1: "",
                subject2: "",
                amount: 0,
            }, "positive", logSource);
        }
    }
}
exports.GameClass = GameClass;
//# sourceMappingURL=Game.js.map