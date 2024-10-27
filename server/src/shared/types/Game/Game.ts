import {IEventService, IEventServiceRenderData,} from "./EventService/EventService";
import {IPawn, IPawnRenderData} from "./Pawns/Pawn";
import {IBeastService, IBeastServiceRenderData} from "./Beasts/BeastService";
import {IPlayer, IPlayerRenderData} from "./PlayerService/Player";
import {ITileService, ITilesServiceRenderData,} from "./TileService/ITileService";
import {IConstructionService, IConstructionServiceRenderData,} from "./ConstructionService/IConstructionService";
import {IResourceService, IResourceServiceRenderData,} from "./Resources/AllResources";
import {IActionSlotService, IActionSlotServiceRenderData,} from "./ActionSlots";
import {ICharacterService, ICharacterServiceRenderData,} from "./CharacterService/CharacterService";
import {IEquipment, IEquipmentRenderData} from "./Equipment/Equipment";
import {IInventionService, IInventionServiceRenderData,} from "./InventionService/InventionService";

import {IMorale, IMoraleRenderData} from "./Morale/Morale";
import {IWeatherService, IWeatherServiceRenderData} from "./Weather/Weather";
import {IPlayerService} from "./PlayerService/PlayerSevice";
import {IPhaseService, IPhaseServiceRenderData,} from "./PhaseService/PhaseService";
import {ILogService} from "./ChatLog/ChatLog";
import {ILogMessageRenderData} from "./ChatLog/LogMessage";
import {IActionService, IActionServiceRenderData,} from "./ActionService/ActionService";
import {IAlertService, IAlertServiceRenderData,} from "./AlertService/AlertService";
import {
    IArrangeCampRestService,
    IArrangeCampRestServiceRenderData,
} from "./RestArrangeCampService/ArrangeCampRestService";
import {IScenarioService, IScenarioServiceRenderData, SCENARIO_STATUS,} from "./ScenarioService/ScenarioService";
import {ITokenService, ITokenServiceRenderData,} from "./TokenService/TokenService";
import {IAdventureService, IAdventureServiceRenderData,} from "./AdventureService/AdventureService";
import {IMysteryService, IMysteryServiceRenderData,} from "./MysteryService/MysteryService";
import {
    IChoiceSelectorRenderData,
    ChoosableConstruction,
    ChoosableObject,
    ChoiceSubject
} from "@shared/types/Game/ChoiceSelector/ChoiceSelector";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGlobalPawnService, IGlobalPawnServiceRenderData} from "@shared/types/Game/GlobalPawnService/GlobalPawnService";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import { EndGameSummary } from "./GameSummary/GameSummary";

export enum GAME_STATUS {
    IN_LOBBY = "in lobby",
    IN_PROGRESS = "in progress",
}

export interface IGameRenderData {
    players: IPlayerRenderData[];
    tileService: ITilesServiceRenderData;
    characterService: ICharacterServiceRenderData;
    resourceService: IResourceServiceRenderData;
    constructionService: IConstructionServiceRenderData;
    inventionService: IInventionServiceRenderData;
    eventService: IEventServiceRenderData;
    equipmentService: IEquipmentRenderData;
    arrangeCampRestService: IArrangeCampRestServiceRenderData;
    beastService: IBeastServiceRenderData;
    phaseService: IPhaseServiceRenderData;
    moraleService: IMoraleRenderData;
    round: number;
    logs: ILogMessageRenderData[];
    actionService: IActionServiceRenderData;

    isFinished: boolean;

    actionSlotService: IActionSlotServiceRenderData;

    alertService: IAlertServiceRenderData;
    scenarioService: IScenarioServiceRenderData;
    weatherService: IWeatherServiceRenderData;
    globalPawnService: IGlobalPawnServiceRenderData;
    tokenService: ITokenServiceRenderData;
    adventureService: IAdventureServiceRenderData;
    mysteryService: IMysteryServiceRenderData;
    objectPickers: IChoiceSelectorRenderData<any>[];
    primePlayer: IPlayerRenderData;

    endGameSummary: EndGameSummary | null;
}

export interface IGame {

    id: string;
    round: number;
    seed: string;

    scenarioStatus: SCENARIO_STATUS;

    isFinished: boolean;


    playerService: IPlayerService;
    characterService: ICharacterService;
    tileService: ITileService;
    resourceService: IResourceService;
    constructionService: IConstructionService;
    inventionService: IInventionService;
    eventService: IEventService;
    equipmentService: IEquipment;
    actionSlotService: IActionSlotService;
    arrangeCampRestService: IArrangeCampRestService;
    beastService: IBeastService;
    moraleService: IMorale;
    tokenService: ITokenService;
    weatherService: IWeatherService;
    phaseService: IPhaseService;
    actionService: IActionService;
    logService: ILogService;
    alertService: IAlertService;
    scenarioService: IScenarioService;

    globalPawnService: IGlobalPawnService;

    setNextRound: () => void;

    areObjectsBeingPicked: boolean;


    adventureService: IAdventureService;
    mysteryService: IMysteryService;

    randomCounter: number;

    setEndGameSummary: () => void;

    getRandomNumber: () => number;


    startPickingObject: <T extends ChoosableObject> (objects: (Exclude<T, ChoosableConstruction> | CONSTRUCTION)[],
                                                    picker: IPlayerCharacter,
                                                    amount: number,
                                                    source: string,
                                                    pickSubject: ChoiceSubject,
                                                    pickEffect: (object: T) => void,
                                                    secondaryEffect?: (object: T) => void
    ) => void,

    pickObjects: (objectPickerId: string, objectIds: string[], secondary: boolean) => void;
    renderData: Omit<IGameRenderData, "localPlayer">;
}

