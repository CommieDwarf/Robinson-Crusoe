import { EventService } from "./EventService/EventService";
import { ActionSlotService } from "./ActionSlotsService/ActionSlotService";
import { TileService } from "./TileService/TileService";
import { ResourceService } from "./ResourceService/ResourceService";
import { ConstructionService } from "./ConstructionService/ConstructionService";
import { InventionsService } from "./Inventions/InventionsService";
import { Equipment } from "./Equipment/Equipment";
import { BeastService } from "./BeastService/BeastService";

import { CharacterService } from "./CharacterService/CharacterService";
import { MoraleService } from "./MoraleService/MoraleService";
import { WeatherService } from "./WeatherService/WeatherService";

import { PlayerService } from "./PlayerService/PlayerService";
import { ActionService } from "./ActionService/ActionService";
import { PhaseService } from "./PhaseService/PhaseService";
import { LogService } from "./LogService/LogService";
import { AlertService } from "./AlertService/AlertService";
import { ArrangeCampRestService } from "./ArrangeCampRestService/ArrangeCampRestService";
import { Castaways } from "./Scenario/Castaways";
import { TokenService } from "./TokenService/TokenService";
import { AdventureService } from "./AdventureService/AdventureService";
import { MysteryService } from "./MysteryService/MysteryService";
import { IResourceService } from "@shared/types/Game/Resources/AllResources";
import { IAdventureService } from "@shared/types/Game/AdventureService/AdventureService";
import { IBeastService } from "@shared/types/Game/Beasts/BeastService";
import { IPlayerService } from "@shared/types/Game/PlayerService/PlayerSevice";
import { IAlertService } from "@shared/types/Game/AlertService/AlertService";
import { IPhaseService } from "@shared/types/Game/PhaseService/PhaseService";
import { IEquipment } from "@shared/types/Game/Equipment/Equipment";
import { IGame, IGameRenderData } from "@shared/types/Game/Game";
import { ICharacterService } from "@shared/types/Game/CharacterService/CharacterService";
import { ITileService } from "@shared/types/Game/TileService/ITileService";
import { IMysteryService } from "@shared/types/Game/MysteryService/MysteryService";
import { IWeatherService } from "@shared/types/Game/Weather/Weather";
import { IConstructionService } from "@shared/types/Game/ConstructionService/IConstructionService";
import { IEventService } from "@shared/types/Game/EventService/EventService";
import { IInventionService } from "@shared/types/Game/InventionService/InventionService";
import { IMoraleService } from "@shared/types/Game/Morale/Morale";
import {
	IScenarioService,
	SCENARIO_STATUS,
} from "@shared/types/Game/ScenarioService/ScenarioService";
import { IActionService } from "@shared/types/Game/ActionService/ActionService";
import {
	IActionSlotService,
	IActionSlotServiceRenderData,
} from "@shared/types/Game/ActionSlots";
import { ILogService } from "@shared/types/Game/ChatLog/ChatLog";
import { IPlayer } from "@shared/types/Game/PlayerService/Player";
import { ChoiceSelector } from "./ChoiceSelector/ChoiceSelector";
import { IPlayerCharacter } from "@shared/types/Game/Characters/PlayerCharacter";
import {
	ChoosableConstruction,
	ChoosableObject,
	ChoiceSubject,
} from "@shared/types/Game/ChoiceSelector/ChoiceSelector";
import { GlobalPawnService } from "./GlobalPawnService/GlobalPawnService";
import { CONSTRUCTION } from "@shared/types/Game/ConstructionService/Construction";
import seedrandom from "seedrandom";
import { ITokenService } from "@shared/types/Game/TokenService/TokenService";
import { IGlobalPawnService } from "@shared/types/Game/GlobalPawnService/GlobalPawnService";
import { uuid } from "uuidv4";
import { EndGameSummary } from "@shared/types/Game/GameSummary/GameSummary";
import { DifficultySettings } from "@shared/types/SessionSettings";

export class GameClass implements IGame {
	get id(): string {
		return this._id;
	}
	private readonly _rng: seedrandom.PRNG;
	private readonly _logService: ILogService;
	private readonly _actionService: ActionService;
	private readonly _playerService: IPlayerService;
	private readonly _resourceService: IResourceService;
	private readonly _constructionService: IConstructionService;
	private readonly _alertService: IAlertService;

	private readonly _weatherService: IWeatherService;
	private readonly _eventService: IEventService;
	private readonly _phaseService: IPhaseService;
	private readonly _characterService: ICharacterService;
	private readonly _inventionService: IInventionService;
	private readonly _equipmentService: IEquipment;
	private readonly _arrangeCampRestService: ArrangeCampRestService;
	private readonly _beastService: IBeastService;
	private readonly _actionSlotService: IActionSlotService;
	private readonly _moraleService: IMoraleService;
	private _round = 1;
	private readonly _scenarioService: IScenarioService;
	private readonly _tokenService: ITokenService;
	private readonly _adventureService: IAdventureService;
	private readonly _mysteryService: IMysteryService;
	private readonly _globalPawnService: IGlobalPawnService;

	private readonly _tileService: ITileService;

	private _objectPickers: ChoiceSelector<any>[] = [];
	private readonly _seed: string;
	private readonly _id: string;
	private _endGameSummary: EndGameSummary | null = null;
	private readonly _difficultySettings: DifficultySettings;

	public randomCounter = 0;

	constructor(
		players: IPlayer[],
		difficultySettings: DifficultySettings,
		loadData?: {
			seed: string;
			id: string;
		},
	) {
		players.forEach((player) => {
			player.initCharacter(this);
			player.ready = false;
		});
		this._seed = loadData?.seed || uuid();
		this._difficultySettings = difficultySettings;
		this._id = loadData?.id || uuid();
		this._rng = seedrandom();

		this._actionService = new ActionService(this);

		this._phaseService = new PhaseService(this);
		this._logService = new LogService(this);
		this._playerService = new PlayerService(players, this);
		this._resourceService = new ResourceService(this);
		this._constructionService = new ConstructionService(this);
		this._alertService = new AlertService();

		this._weatherService = new WeatherService(this);
		this._eventService = new EventService(this);
		this._tileService = new TileService(this, 7);
		this._characterService = new CharacterService(
			players.map((player) => player.getCharacter()),
			this
		);
		this._inventionService = new InventionsService(
			"castaways",
			this.tileService,
			this
		);
		this._equipmentService = new Equipment(this);
		this._arrangeCampRestService = new ArrangeCampRestService(this);
		this._beastService = new BeastService(this);
		this._actionSlotService = new ActionSlotService(this);
		this._moraleService = new MoraleService(this);
		this._round = 1;

		this._scenarioService = new Castaways(this);
		this._tokenService = new TokenService(this);
		this._adventureService = new AdventureService(this);
		this._mysteryService = new MysteryService(this);
		this._globalPawnService = new GlobalPawnService(this);
	}

	get renderData(): Omit<IGameRenderData, "localPlayer"> {
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
			objectPickers: this._objectPickers.map(
				(objPicker) => objPicker.renderData
			),
			primePlayer: this._playerService.primePlayer.renderData,
			endGameSummary: this._endGameSummary,
			isFinished: this.isFinished,
		};
	}

    get difficultySettings(): DifficultySettings {
        return this._difficultySettings;
    }

	get isFinished(): boolean {
		return this.scenarioStatus !== SCENARIO_STATUS.PENDING;
	}

	get mysteryService(): IMysteryService {
		return this._mysteryService;
	}

	get adventureService(): IAdventureService {
		return this._adventureService;
	}

	get actionSlotService(): IActionSlotService {
		return this._actionSlotService;
	}

	get tokenService(): ITokenService {
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

	get moraleService(): IMoraleService {
		return this._moraleService;
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

	get globalPawnService(): IGlobalPawnService {
		return this._globalPawnService;
	}

	get areObjectsBeingPicked(): boolean {
		return this._objectPickers.length !== 0;
	}

	get seed(): string {
		return this._seed;
	}

	get scenarioStatus(): SCENARIO_STATUS {
		return this._scenarioService.status;
	}

	public getRandomNumber = () => {
		this.randomCounter++;
		return this._rng();
	};

	public startPickingObject<T extends ChoosableObject>(
		objects: (Exclude<T, ChoosableConstruction> | CONSTRUCTION)[],
		picker: IPlayerCharacter,
		amount: number,
		source: string,
		pickSubject: ChoiceSubject,
		pickEffect: (object: T) => void,
		secondaryEffect?: (object: T) => void
	) {
		const mappedObjects = objects.map((obj) => {
			if (typeof obj !== "object") {
				return { name: obj } as T;
			} else {
				return obj as T;
			}
		});
		this._objectPickers.push(
			new ChoiceSelector<T>(
				this,
				mappedObjects,
				picker,
				amount,
				source,
				pickSubject,
				pickEffect,
				secondaryEffect
			)
		);
	}

	public pickObjects(
		pickerId: string,
		objectIds: string[],
		secondaryEffect: boolean
	) {
		const objPicker = this._objectPickers.find(
			(objectPicker) => objectPicker.id === pickerId
		);
		if (objPicker) {
			objPicker.pick(objectIds, secondaryEffect);
			this._objectPickers = this._objectPickers.filter(
				(objPicker) => pickerId !== objPicker.id
			);
		} else {
			throw new Error("objPicker is missing");
		}
	}

	setNextRound() {
		this._round++;
	}

	public setEndGameSummary() {
		if (this._scenarioService.status === SCENARIO_STATUS.PENDING) {
			throw new Error("Tried to get game summary from ongoing game");
		}

		let defeatReason: EndGameSummary["defeatReason"];

		if (this.scenarioStatus == SCENARIO_STATUS.WIN) {
			defeatReason = null;
		} else if (this._characterService.isAnyPlayerDead) {
			defeatReason = "death";
		} else {
			defeatReason = "failedObjective";
		}

		const lastRound = this._scenarioService.lastRound;

		this._endGameSummary = {
			roundsSurvived: this.round > lastRound ? lastRound : this.round,
			status: this._scenarioService.status,
			defeatReason,
			players: this._playerService.players.map(
				(player) => player.renderData
			),
		};
	}
}
