import {
  IEventService,
  IEventServiceRenderData,
} from "./EventService/EventService";
import { IPawn, IPawnRenderData } from "./Pawns/Pawn";
import { IBeastService, IBeastServiceRenderData } from "./Beasts/BeastService";
import { IPlayerRenderData } from "./PlayerService/Player";
import {
  ITileService,
  ITilesServiceRenderData,
} from "./TileService/ITileService";
import {
  IConstructionService,
  IConstructionServiceRenderData,
} from "./ConstructionService/IConstructionService";
import {
  IResourceService,
  IResourceServiceRenderData,
} from "./Resources/AllResources";
import {
  IActionSlotService,
  IActionSlotsServiceRenderData,
} from "./ActionSlots";
import {
  ICharacterService,
  ICharacterServiceRenderData,
} from "./CharacterService/CharacterService";
import { IEquipment, IEquipmentRenderData } from "./Equipment/Equipment";
import { Player } from "../server/Classes/Players/Player";
import {
  IInventionService,
  IInventionServiceRenderData,
} from "./InventionService/InventionService";

import { IMorale, IMoraleRenderData } from "./Morale/Morale";
import { IWeatherService, IWeatherServiceRenderData } from "./Weather/Weather";
import { IPlayerService } from "./PlayerService/PlayerSevice";
import {
  IPhaseService,
  IPhaseServiceRenderData,
} from "./PhaseService/PhaseService";
import { IChatLog } from "./ChatLog/ChatLog";
import { ILogMessageRenderData } from "./ChatLog/LogMessage";
import {
  IActionService,
  IActionServiceRenderData,
} from "./ActionService/ActionService";
import {
  IAlertService,
  IAlertServiceRenderData,
} from "./AlertService/AlertService";
import {
  IArrangeCampRestService,
  IArrangeCampRestServiceRenderData,
} from "./RestArrangeCampService/ArrangeCampRestService";
import {
  IScenarioService,
  IScenarioServiceRenderData,
} from "./ScenarioService/ScenarioService";
import {
  ITokenService,
  ITokenServiceRenderData,
} from "./TokenService/TokenService";

export interface IGameRenderData {
  players: IPlayerRenderData[];
  localPlayer: IPlayerRenderData;
  tileService: ITilesServiceRenderData;
  characterService: ICharacterServiceRenderData;
  resourceService: IResourceServiceRenderData;
  constructionService: IConstructionServiceRenderData;
  inventionService: IInventionServiceRenderData;
  eventService: IEventServiceRenderData;
  equipmentService: IEquipmentRenderData;
  actionSlotService: IActionSlotsServiceRenderData;
  arrangeCampRestService: IArrangeCampRestServiceRenderData;
  beastService: IBeastServiceRenderData;
  phaseService: IPhaseServiceRenderData;
  moraleService: IMoraleRenderData;
  round: number;
  logs: ILogMessageRenderData[];
  actionService: IActionServiceRenderData;
  alertService: IAlertServiceRenderData;
  scenarioService: IScenarioServiceRenderData;
  weatherService: IWeatherServiceRenderData;
  allPawns: IPawnRenderData[];
  tokenService: ITokenServiceRenderData;
}

export interface IGame {
  playerService: IPlayerService;
  localPlayer: Player;
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
  chatLog: IChatLog;
  alertService: IAlertService;
  scenarioService: IScenarioService;
  allPawns: IPawn[];
  round: number;
  setNextRound: () => void;
  setPawn: (droppableId: string, draggableId: string) => void;
  unsetPawn: (destinationId: string, draggableId: string) => void;
  resetPawns: () => void;

  renderData: IGameRenderData;
}
