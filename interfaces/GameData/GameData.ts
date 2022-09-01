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
import {
  IPlayerCharacter,
  PlayerCharacterName,
} from "../Characters/PlayerCharacter";
import { IPawnsService } from "../Pawns/Pawns";
import { ICharEffects } from "../Characters/CharEffects";
import { IDictionary } from "../IDictionary";
import { ISkill } from "../Characters/Skill";
import { IPawn } from "../Pawns/Pawn";

export interface StructureData {
  name: STRUCTURE;
  lvl: number;
  requiredHelperAmount: number;
  committedResources: IResourcesAmount;
}

export interface InventionData {
  name: string;
  committedResources: IResourcesAmount;
  requiredHelperAmount: number;
  locked: boolean;
  built: boolean;
  type: "personal" | "scenario" | "starter" | "normal";
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

export interface PlayerData {
  name: string;
  color: string;
  id: number;
  character: PlayerCharacterData;
}

export interface CharacterData {
  pawns: PawnData[];
  name: CharacterName;
  id: number;
  health: number;
  namePL: CHAR_NAME_TRANSLATION;
  currentHealth: number;
  gender: string;
}

export interface PlayerCharacterData extends CharacterData {
  player: IPlayer;
  name: PlayerCharacterName;
  gender: "male" | "female";
  moraleThresholds: number[];
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
  structures: StructureData[];
  inventions: InventionData[];
  threat: IThreat;
  equipment: ItemData[];
  actionSlots: Object;
  restPawnAmount: number;
  arrangeCampPawnAmount: number;
  beastCount: number;
  allPawns: PawnData[];
}
