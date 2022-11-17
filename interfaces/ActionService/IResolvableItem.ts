import { Action } from "../Action";
import { IPawn, IPawnRenderData } from "../Pawns/Pawn";
import { IEventCard, IEventCardRenderData } from "../Threat/EventCard";
import { IBeast, IBeastRenderData } from "../Beasts/Beast";
import { IInvention, IInventionRenderData } from "../Inventions/Invention";
import { IStructure, IStructureRenderData } from "../Structures/Structure";
import { ITile, ITileRenderData } from "../Tiles/Tile";

import { RESOLVE_ITEM_STATUS } from "./IActionResolvableService";
import {
  IArrangeCampRestService,
  IArrangeCampRestServiceRenderData,
} from "../RestArrangeCampService/ArrangeCampRestService";
import {
  ActionDice,
  ActionRollDiceInfo,
  DiceActionType,
  RollDiceResult,
} from "../RollDice/RollDice";
import { RollDiceService } from "../../server/Classes/RollDiceService/RollDiceService";

export interface IResolvableItem {
  droppableId: string;
  content: IResolvableItemContent;
  additionalInfo: IResolvableItemAdditionalInfo;
  status: RESOLVE_ITEM_STATUS;
  leader: IPawn;
  helpers: number;
  incrementHelpers: () => void;
  renderData: IResolvableItemRenderData;
  diceRoll: ActionRollDiceInfo | null;
  rollAllDices: (action: DiceActionType) => void;
  reRoll: (action: DiceActionType, dice: ActionDice) => void;
  applyRollDiceEffects: () => void;
}

export type IResolvableItemContentRenderData =
  | IEventCardRenderData
  | IBeastRenderData
  | IInventionRenderData
  | IStructureRenderData
  | ITileRenderData
  | IArrangeCampRestServiceRenderData;

export interface IResolvableItemRenderData {
  droppableId: string;
  content: IResolvableItemContentRenderData;
  action: Action;
  additionalInfo: IResolvableItemAdditionalInfo;
  status: RESOLVE_ITEM_STATUS;
  leader: IPawnRenderData;
  diceRoll: ActionRollDiceInfo | null;
}

export type IResolvableItemContent =
  | IEventCard
  | IBeast
  | IInvention
  | IStructure
  | ITile
  | IArrangeCampRestService;

export interface IResolvableItemAdditionalInfo {
  resource?: "left" | "right";
}
