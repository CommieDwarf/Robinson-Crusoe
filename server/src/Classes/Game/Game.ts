import {EventService} from "./EventService/EventService";
import {ActionSlotService} from "./ActionSlotsService/ActionSlotService";
import {TileService} from "./TileService/TileService";
import {ResourceService} from "./ResourceService/ResourceService";
import {ConstructionService} from "./ConstructionService/ConstructionService";
import {InventionsService} from "./Inventions/InventionsService";
import {Equipment} from "./Equipment/Equipment";
import {BeastService} from "./BeastService/BeastService";

import {CharacterService} from "./CharacterService/CharacterService";
import {MoraleService} from "./MoraleService/MoraleService";
import {WeatherService} from "./WeatherService/WeatherService";

import {PlayerService} from "./Players/PlayerService";
import {ActionService} from "./ActionService/ActionService";
import {PhaseService} from "./PhaseService/PhaseService";
import {LogService} from "./LogService/LogService";
import {AlertService} from "./AlertService/AlertService";
import {ArrangeCampRestService} from "./ArrangeCampRestService/ArrangeCampRestService";
import {Castaways} from "./Scenario/Castaways";
import {TokenService} from "./TokenService/TokenService";
import {AdventureService} from "./AdventureService/AdventureService";
import {MysteryService} from "./MysteryService/MysteryService";
import {IResourceService} from "@shared/types/Game/Resources/AllResources";
import {IAdventureService} from "@shared/types/Game/AdventureService/AdventureService";
import {IBeastService} from "@shared/types/Game/Beasts/BeastService";
import {IPlayerService} from "@shared/types/Game/PlayerService/PlayerSevice";
import {IAlertService} from "@shared/types/Game/AlertService/AlertService";
import {IPhaseService} from "@shared/types/Game/PhaseService/PhaseService";
import {IEquipment} from "@shared/types/Game/Equipment/Equipment";
import {GAME_STATUS, IGame, IGameRenderData} from "@shared/types/Game/Game";
import {ICharacterService} from "@shared/types/Game/CharacterService/CharacterService";
import {ITileService} from "@shared/types/Game/TileService/ITileService";
import {IMysteryService} from "@shared/types/Game/MysteryService/MysteryService";
import {IWeatherService} from "@shared/types/Game/Weather/Weather";
import {IConstructionService} from "@shared/types/Game/ConstructionService/IConstructionService";
import {IEventService} from "@shared/types/Game/EventService/EventService";
import {IInventionService} from "@shared/types/Game/InventionService/InventionService";
import {IMorale} from "@shared/types/Game/Morale/Morale";
import {IScenarioService} from "@shared/types/Game/ScenarioService/ScenarioService";
import {IActionService} from "@shared/types/Game/ActionService/ActionService";
import {IActionSlotServiceRenderData} from "@shared/types/Game/ActionSlots";
import {ILogService} from "@shared/types/Game/ChatLog/ChatLog";
import {LOG_CODE} from "@shared/types/Game/ChatLog/LOG_CODE";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ObjectPicker} from "./ObjectPicker/ObjectPicker";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {PickableObject, PickSubject} from "@shared/types/Game/ObjectPicker/ObjectPicker";
import {GlobalPawnService} from "./GlobalPawnService/GlobalPawnService";


export class GameClass implements IGame {

    private _logService: ILogService = new LogService(this);
    private _actionService: ActionService = new ActionService(this);
    private readonly _playerService: IPlayerService;
    private readonly _localPlayer: IPlayer;
    private _tileService: ITileService = new TileService(this, 7);
    private _resourceService: IResourceService = new ResourceService(this);
    private _constructionService: IConstructionService = new ConstructionService(
        this
    );
    private _alertService: IAlertService = new AlertService();
    private readonly _inventionService: IInventionService = new InventionsService(
        "castaways",
        this._tileService,
        this
    );
    private _weatherService: IWeatherService = new WeatherService(this);
    private _eventService: IEventService = new EventService(this);
    private _phaseService: IPhaseService = new PhaseService(this);
    private readonly _characterService: ICharacterService;
    private _equipmentService: IEquipment = new Equipment(this);
    private _arrangeCampRestService = new ArrangeCampRestService(this);
    private _beastService: IBeastService = new BeastService(this);
    private _actionSlotService = new ActionSlotService(this);
    private _moraleService = new MoraleService(this);
    private _round = 9;
    private _scenarioService: IScenarioService = new Castaways(this);
    private _tokenService = new TokenService(this);
    private _adventureService = new AdventureService(this);
    private _mysteryService = new MysteryService(this);
    private _globalPawnService = new GlobalPawnService(this);

    private _gameStatus: GAME_STATUS = GAME_STATUS.PENDING;

    private _objectPickers: ObjectPicker<any>[] = [];

    constructor(players: IPlayer[]) {
        // this is hardcoded for demo purpose.
        this._localPlayer = players[0]
        players.forEach((player) => player.initCharacter(this))
        console.log(players)

        this._playerService = new PlayerService([this.localPlayer]);
        this._characterService = new CharacterService(
            [this.localPlayer.getCharacter()],
            this
        );
    }

    get renderData(): IGameRenderData {
        return {
            characterService: this._characterService.renderData,
            resourceService: this.resourceService.renderData,
            arrangeCampRestService: this._arrangeCampRestService.renderData,
            beastService: this.beastService.renderData,
            equipmentService: this.equipmentService.renderData,
            inventionService: this.inventionService.renderData,
            localPlayer: this.localPlayer.renderData,
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
            objectPickers: this._objectPickers.map((objPicker) => objPicker.renderData)
        };
    }

    get mysteryService(): IMysteryService {
        return this._mysteryService;
    }

    get adventureService(): IAdventureService {
        return this._adventureService;
    }

    get actionSlotService(): ActionSlotService {
        return this._actionSlotService;
    }

    get tokenService(): TokenService {
        return this._tokenService;
    }

    get weatherService(): IWeatherService {
        return this._weatherService;
    }

    get scenarioService(): IScenarioService {
        return this._scenarioService;
    }

    get arrangeCampRestService(): ArrangeCampRestService {
        return this._arrangeCampRestService;
    }

    get actionSlotRenderData(): IActionSlotServiceRenderData {
        return this._actionSlotService.renderData;
    }

    get alertService(): IAlertService {
        return this._alertService;
    }

    get characterService(): ICharacterService {
        return this._characterService;
    }

    get logService(): ILogService {
        return this._logService;
    }

    get round(): number {
        return this._round;
    }

    get actionService(): IActionService {
        return this._actionService;
    }

    get phaseService(): IPhaseService {
        return this._phaseService;
    }

    get playerService(): IPlayerService {
        return this._playerService;
    }

    get moraleService(): IMorale {
        return this._moraleService;
    }

    get localPlayer(): IPlayer {
        return this._localPlayer;
    }

    get tileService(): ITileService {
        return this._tileService;
    }

    get resourceService(): IResourceService {
        return this._resourceService;
    }

    get constructionService(): IConstructionService {
        return this._constructionService;
    }

    get inventionService(): IInventionService {
        return this._inventionService;
    }

    get eventService(): IEventService {
        return this._eventService;
    }

    get equipmentService(): IEquipment {
        return this._equipmentService;
    }

    get beastService(): IBeastService {
        return this._beastService;
    }

    get globalPawnService(): GlobalPawnService {
        return this._globalPawnService;
    }


    get gameStatus(): GAME_STATUS {
        return this._gameStatus;
    }


    public startPickingObject<T extends PickableObject>(objects: T[],
                                                        picker: IPlayerCharacter,
                                                        amount: number,
                                                        source: string,
                                                        pickSubject: PickSubject,
                                                        pickEffect: (object: T) => void,
                                                        secondaryEffect?: (object: T) => void,
    ) {
        this._objectPickers.push(new ObjectPicker<T>(
            this,
            objects,
            picker,
            amount,
            source,
            pickSubject,
            pickEffect,
            secondaryEffect));
    }

    public pickObjects(pickerId: string, objectIds: string[], secondaryEffect: boolean) {
        const objPicker = this._objectPickers.find((objectPicker) => objectPicker.id === pickerId)
        if (objPicker) {
            objPicker.pick(objectIds, secondaryEffect);
            this._objectPickers = this._objectPickers.filter((objPicker) => pickerId !== objPicker.id);
        } else {
            throw new Error("objPicker is missing")
        }
    }


    setNextRound() {
        this._round++;
    }

    setGameStatus(status: GAME_STATUS.WIN | GAME_STATUS.LOSE, logSource: string = "") {
        this._gameStatus = status;
        if (status === GAME_STATUS.LOSE) {
            this._logService.addMessage({
                code: LOG_CODE.GAME_LOST,
                subject1: "",
                subject2: "",
                amount: 0,
            }, "negative", logSource);
        } else {
            this._logService.addMessage({
                code: LOG_CODE.GAME_WON,
                subject1: "",
                subject2: "",
                amount: 0,
            }, "positive", logSource);
        }
    }
}
