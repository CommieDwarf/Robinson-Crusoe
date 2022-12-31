import { ACTION } from "../ACTION";
import { IPawn, IPawnHelper, IPawnRenderData } from "../Pawns/Pawn";
import { IEventCard, IEventCardRenderData } from "../EventService/EventCard";
import { IBeast, IBeastRenderData } from "../Beasts/Beast";
import {
  IInvention,
  IInventionRenderData,
} from "../InventionService/Invention";
import {
  IConstruction,
  IConstructionRenderData,
} from "../ConstructionService/Construction";
import { ITile, ITileRenderData } from "../TileService/ITile";

import { RESOLVE_ITEM_STATUS } from "./IActionResolvableService";
import {
  IArrangeCampRestService,
  IArrangeCampRestServiceRenderData,
} from "../RestArrangeCampService/ArrangeCampRestService";
import {
  ActionDice,
  ActionRollDiceInfo,
  DiceActionType,
} from "../RollDice/RollDice";

export interface IResolvableItem<Content> {
  droppableId: string;
  content: Content;
  additionalInfo: IResolvableItemAdditionalInfo;
  status: RESOLVE_ITEM_STATUS;
  leader: IPawn;
  helpers: (IPawn | IPawnHelper)[];
  addHelper: (pawn: IPawn | IPawnHelper) => void;
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
  | IConstructionRenderData
  | ITileRenderData
  | IArrangeCampRestServiceRenderData;

export interface IResolvableItemRenderData {
  droppableId: string;
  content: IResolvableItemContentRenderData;
  action: ACTION;
  additionalInfo: IResolvableItemAdditionalInfo;
  status: RESOLVE_ITEM_STATUS;
  leader: IPawnRenderData;
  diceRoll: ActionRollDiceInfo | null;
}

export type IResolvableItemContent =
  | IEventCard
  | IBeast
  | IInvention
  | IConstruction
  | ITile
  | IArrangeCampRestService;

export interface IResolvableItemAdditionalInfo {
  resource?: "left" | "right";
}
