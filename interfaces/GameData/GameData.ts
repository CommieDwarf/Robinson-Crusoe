import { IPlayer } from "../Player";
import {
  CHAR_NAME_TRANSLATION,
  CharacterName,
  ICharacter,
} from "../Characters/Character";
import ITile from "../Tiles/Tile";
import { IResourcesAmount } from "../Resources/Resources";
import { STRUCTURE } from "../Structures/Structure";
import { IThreat } from "../Threat/Threat";
import { EqList } from "../../server/constants/eqList";

export interface StructuresData {
  name: STRUCTURE;
  lvl: number;
  requiredHelperAmount: number;
  committedResources: IResourcesAmount;
}

export interface InventionsData {
  name: string;
  committedResources: IResourcesAmount;
  requiredHelperAmount: number;
  locked: boolean;
  built: boolean;
}

export interface ItemData {
  name: keyof EqList;
  uses: number;
}

export interface PawnData {
  draggableId: string;
  characterName: CharacterName;
  characterNamePL: CHAR_NAME_TRANSLATION;
}

export interface GameData {
  players: IPlayer[];
  localPlayer: IPlayer;
  characters: ICharacter[];
  tiles: ITile[];
  allResources: {
    future: IResourcesAmount;
    owned: IResourcesAmount;
  };
  structures: StructuresData[];
  inventions: InventionsData[];
  threat: IThreat;
  equipment: ItemData[];
  actionSlots: Object;
  restPawnAmount: number;
  arrangeCampPawnAmount: number;
  beastCount: number;
  allPawns: PawnData[];
}
