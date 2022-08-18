import { IThreat } from "./Threat/Threat";
import { IPawn } from "./Pawns/Pawn";
import { IBeasts } from "./Beasts/Beasts";
import { IPlayer } from "./Player";
import { IAdditionalActivity } from "./AdditionalActivity";
import { ITilesService } from "./Tiles/Tiles";
import { IStructuresService } from "./Structures/Structures";
import { IAllResources } from "./Resources/AllResources";
import { IActionSlotsService } from "./ActionSlots";
import { IAllCharacters } from "../components/game/interface/Characters";
import { IEquipment } from "./Equipment/Equipment";
import { Player } from "../server/Classes/Players/Players";
import { InventionsService } from "../server/Classes/Inventions/InventionsService";
import { IInventionsService } from "./Inventions/Inventions";

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

  setPawn: (droppableId: string, pawn: IPawn) => void;
  unsetPawn: (destinationId: string, draggableId: string) => void;
}
