import { IThreat, IThreatRenderData } from "./Threat/Threat";
import { IPawn, IPawnRenderData } from "./Pawns/Pawn";
import { IBeasts, IBeastsRenderData } from "./Beasts/Beasts";
import { IPlayer, IPlayerRenderData } from "./Player";
import { IAdditionalActivity } from "./AdditionalActivity";
import { ITilesService, ITilesServiceRenderData } from "./Tiles/Tiles";
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
import { IAllCharacters } from "../components/game/interface/Characters";
import { IEquipment, IEquipmentRenderData } from "./Equipment/Equipment";
import { Player } from "../server/Classes/Players/Players";
import {
  IInventionsService,
  IInventionsServiceRenderData,
} from "./Inventions/Inventions";
import { ISideCharacterRenderData } from "./Characters/SideCharacter";
import { IPlayerCharacterRenderData } from "./Characters/PlayerCharacter";
import { IMorale } from "./Morale/Morale";
import { IWeather } from "./Weather/Weather";

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
}

export interface IGame {
  players: IPlayer[];
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

  setPawn: (droppableId: string, draggableId: string) => void;
  unsetPawn: (destinationId: string, draggableId: string) => void;

  renderData: IGameRenderData;
}
