import { IThreat } from "./Threat/Threat";
import { ISideCharacter } from "./Characters/SideCharacter";
import { IPawn } from "./Pawns/Pawn";
import { IBeasts } from "./Beasts/Beasts";
import { IPlayer } from "./Player";
import AdditionalActivity from "./AdditionalActivity";
import { ITiles } from "./Tiles/Tiles";
import { IStructures } from "./Structures/Structures";
import { IAllResources } from "./Resources/AllResources";

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
  sideCharacters: {
    dog: ISideCharacter;
    friday: ISideCharacter;
  };
  actionSlots: Map<string, null | IPawn>;
  rest: AdditionalActivity;
  arrangeCamp: AdditionalActivity;
  beasts: IBeasts;
  allPawns: IPawn[];
}
