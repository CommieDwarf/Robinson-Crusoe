import { IThreat, IThreatRenderData } from "./Threat/Threat";
import { IPawn, IPawnRenderData } from "./Pawns/Pawn";
import { IBeasts, IBeastsRenderData } from "./Beasts/Beasts";
import { IPlayerRenderData } from "./PlayerService/Player";
import { ITilesService, ITilesServiceRenderData } from "./Tiles/TilesService";
import {
  IStructuresService,
  IStructuresServiceRenderData,
} from "./Structures/Structures";
import {
  IAllResources,
  IAllResourcesRenderData,
} from "./Resources/AllResources";
import {
  IActionSlotsService,
  IActionSlotsServiceRenderData,
} from "./ActionSlots";
import {
  ICharacterService,
  ICharacterServiceRenderData,
} from "./CharacterService/CharacterService";
import { IEquipment, IEquipmentRenderData } from "./Equipment/Equipment";
import { Player } from "../server/Classes/Players/Player";
import {
  IInventionsService,
  IInventionsServiceRenderData,
} from "./Inventions/Inventions";
import {
  ISideCharacter,
  ISideCharacterRenderData,
} from "./Characters/SideCharacter";
import {
  IPlayerCharacter,
  IPlayerCharacterRenderData,
} from "./Characters/PlayerCharacter";
import { IMorale, IMoraleRenderData } from "./Morale/Morale";
import { IWeather } from "./Weather/Weather";
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

export interface IGameRenderData {
  players: IPlayerRenderData[];
  localPlayer: IPlayerRenderData;
  tilesService: ITilesServiceRenderData;
  characterService: ICharacterServiceRenderData;
  allResources: IAllResourcesRenderData;
  structuresService: IStructuresServiceRenderData;
  inventionsService: IInventionsServiceRenderData;
  threat: IThreatRenderData;
  equipment: IEquipmentRenderData;
  actionSlotsService: IActionSlotsServiceRenderData;
  arrangeCampRestService: IArrangeCampRestServiceRenderData;
  beasts: IBeastsRenderData;
  allPawns: IPawnRenderData[];
  phaseService: IPhaseServiceRenderData;
  morale: IMoraleRenderData;
  turn: number;
  logs: ILogMessageRenderData[];
  actionService: IActionServiceRenderData;
  alertService: IAlertServiceRenderData;
  scenarioService: IScenarioServiceRenderData;
}

export interface IGame {
  playerService: IPlayerService;
  localPlayer: Player;
  characterService: ICharacterService;
  tilesService: ITilesService;
  allResources: IAllResources;
  structuresService: IStructuresService;
  inventionsService: IInventionsService;
  threat: IThreat;
  equipment: IEquipment;
  actionSlotsService: IActionSlotsService;
  arrangeCampRestService: IArrangeCampRestService;
  beasts: IBeasts;
  allPawns: IPawn[];
  morale: IMorale;
  weather: IWeather;
  phaseService: IPhaseService;
  actionService: IActionService;
  chatLog: IChatLog;
  alertService: IAlertService;
  scenarioService: IScenarioService;

  turn: number;
  setNextTurn: () => void;
  setPawn: (droppableId: string, draggableId: string) => void;
  unsetPawn: (destinationId: string, draggableId: string) => void;
  resetPawns: () => void;

  renderData: IGameRenderData;
}
