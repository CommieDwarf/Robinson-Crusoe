import { IThreat } from "./Threat/Threat";
import { ISideCharacter } from "./Characters/SideCharacter";
import { IPawn } from "./Pawns/Pawn";
import { IBeasts } from "./Beasts/Beasts";
import { IPlayer } from "./Player";
import AdditionalActivity from "./AdditionalActivity";
import { ITiles } from "./Tiles/Tiles";
import { IStructures } from "./Structures/Structures";
import { IAllResources } from "./Resources/AllResources";
import { IInventions } from "./Inventions/Inventions";
import { IActionSlots } from "./ActionSlots";
import { ICharacter } from "./Characters/Character";
import { IPlayerCharacter } from "./Characters/PlayerCharacter";
import { IAllCharacters } from "../components/game/interface/Characters";

class IEquipment {}

export interface IGame {
  players: IPlayer[];
  tiles: ITiles;
  allResources: IAllResources;
  structures: IStructures;
  inventions: IInventions;
  threat: IThreat;
  equipment: IEquipment;
  player: IPlayer;
  allCharacters: IAllCharacters;
  sideCharacters: {
    dog: ISideCharacter;
    friday: ISideCharacter;
  };
  actionSlots: IActionSlots;
  rest: AdditionalActivity;
  arrangeCamp: AdditionalActivity;
  beasts: IBeasts;
  allPawns: IPawn[];
  setPawns: (
    sourceId: string,
    destinationId: string,
    draggableId: string
  ) => void;
  setPawn: (droppableId: string, pawn: IPawn) => void;
  unsetPawn: (destinationId: string, draggableId: string) => void;
}
