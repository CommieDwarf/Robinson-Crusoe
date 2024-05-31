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
import {IScenarioService, IScenarioServiceRenderData,} from "./ScenarioService/ScenarioService";
import {ITokenService, ITokenServiceRenderData,} from "./TokenService/TokenService";
import {IAdventureService, IAdventureServiceRenderData,} from "./AdventureService/AdventureService";
import {IMysteryService, IMysteryServiceRenderData,} from "./MysteryService/MysteryService";
import {IObjectPickerRenderData, PickableObject, PickSubject} from "@shared/types/Game/ObjectPicker/ObjectPicker";
import {IPlayerCharacter} from "@shared/types/Game/Characters/PlayerCharacter";
import {IGlobalPawnService, IGlobalPawnServiceRenderData} from "@shared/types/Game/GlobalPawnService/GlobalPawnService";

export enum GAME_STATUS {
    PENDING = "pending",
    LOSE = "lose",
    WIN = "win",
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

    actionSlotService: IActionSlotServiceRenderData;

    alertService: IAlertServiceRenderData;
    scenarioService: IScenarioServiceRenderData;
    weatherService: IWeatherServiceRenderData;
    globalPawnService: IGlobalPawnServiceRenderData;
    tokenService: ITokenServiceRenderData;
    adventureService: IAdventureServiceRenderData;
    mysteryService: IMysteryServiceRenderData;
    objectPickers: IObjectPickerRenderData<any>[];
}

export interface IGame {
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
    round: number;
    setNextRound: () => void;

    gameStatus: GAME_STATUS;

    adventureService: IAdventureService;
    mysteryService: IMysteryService;


    setGameStatus: (status: GAME_STATUS.WIN | GAME_STATUS.LOSE, reason?: string) => void;

    startPickingObject: <T extends PickableObject> (objects: T[],
                                                    picker: IPlayerCharacter,
                                                    amount: number,
                                                    source: string,
                                                    pickSubject: PickSubject,
                                                    pickEffect: (object: T) => void,
                                                    secondaryEffect?: (object: T) => void
    ) => void,

    pickObjects: (objectPickerId: string, objectIds: string[], secondary: boolean) => void;
    renderData: Omit<IGameRenderData, "localPlayer">;
}

