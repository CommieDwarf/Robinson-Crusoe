import { IThreat, IThreatRenderData } from "./Threat/Threat";
import { IPawn, IPawnRenderData } from "./Pawns/Pawn";
import { IBeasts, IBeastsRenderData } from "./Beasts/Beasts";
import { IPlayer, IPlayerRenderData } from "./PlayerService/Player";
import { IAdditionalActivity } from "./AdditionalActivity";
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
import { IAllCharacters } from "./AllCharacters/Characters";
import { IEquipment, IEquipmentRenderData } from "./Equipment/Equipment";
import { Player } from "../server/Classes/Players/Player";
import {
  IInventionsService,
  IInventionsServiceRenderData,
} from "./Inventions/Inventions";
import { ISideCharacterRenderData } from "./Characters/SideCharacter";
import { IPlayerCharacterRenderData } from "./Characters/PlayerCharacter";
import { IMorale, IMoraleRenderData } from "./Morale/Morale";
import { IWeather } from "./Weather/Weather";
import { IPlayerService } from "./PlayerService/PlayerSevice";
import {
  IPhaseService,
  IPhaseServiceRenderData,
} from "./PhaseService/PhaseService";
import { IActionService } from "./ActionService/IActionService";
import { IChatLog } from "./ChatLog/ChatLog";
import { ILogMessageRenderData } from "./ChatLog/LogMessage";

export interface IGameRenderData {
  players: IPlayerRenderData[];
  localPlayer: IPlayerRenderData;
  allCharacters: (IPlayerCharacterRenderData | ISideCharacterRenderData)[];
  tilesService: ITilesServiceRenderData;
  allResources: IAllResourcesRenderData;
  structuresService: IStructuresServiceRenderData;
  inventionsService: IInventionsServiceRenderData;
  threat: IThreatRenderData;
  equipment: IEquipmentRenderData;
  actionSlotsService: IActionSlotsServiceRenderData;
  rest: IAdditionalActivity;
  arrangeCamp: IAdditionalActivity;
  beasts: IBeastsRenderData;
  allPawns: IPawnRenderData[];
  phaseService: IPhaseServiceRenderData;
  morale: IMoraleRenderData;
  turn: number;
  logs: ILogMessageRenderData[];
}

export interface IGame {
  playerService: IPlayerService;
  localPlayer: Player;
  allCharacters: IAllCharacters;
  tilesService: ITilesService;
  allResources: IAllResources;
  structuresService: IStructuresService;
  inventionsService: IInventionsService;
  threat: IThreat;
  equipment: IEquipment;
  actionSlotsService: IActionSlotsService;
  rest: IAdditionalActivity;
  arrangeCamp: IAdditionalActivity;
  beasts: IBeasts;
  allPawns: IPawn[];
  morale: IMorale;
  weather: IWeather;
  phaseService: IPhaseService;
  actionService: IActionService;
  chatLog: IChatLog;

  turn: number;
  setNextTurn: () => void;
  setPawn: (droppableId: string, draggableId: string) => void;
  unsetPawn: (destinationId: string, draggableId: string) => void;
  renderData: IGameRenderData;
}
