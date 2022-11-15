import { Action } from "../Action";
import { IPawn, IPawnRenderData } from "../Pawns/Pawn";
import { IEventCard, IEventCardRenderData } from "../Threat/EventCard";
import { IBeast, IBeastRenderData } from "../Beasts/Beast";
import { IInvention, IInventionRenderData } from "../Inventions/Invention";
import { IStructure, IStructureRenderData } from "../Structures/Structure";
import { ITile, ITileRenderData } from "../Tiles/Tile";
import {
  IRestArrange,
  IRestArrangeRenderData,
} from "../ArrangeCampService/ArrangeCampService";
import { RESOLVE_ITEM_STATUS } from "./IActionResolvableService";

export interface IResolvableItem {
  droppableId: string;
  content: IResolvableItemContent;
  additionalInfo: IResolvableItemAdditionalInfo;
  status: RESOLVE_ITEM_STATUS;
  leader: IPawn;
  helpers: number;
  incrementHelpers: () => void;
  renderData: IResolvableItemRenderData;
}

export type IResolvableItemContentRenderData =
  | IEventCardRenderData
  | IBeastRenderData
  | IInventionRenderData
  | IStructureRenderData
  | ITileRenderData
  | IRestArrangeRenderData;

export interface IResolvableItemRenderData {
  droppableId: string;
  content: IResolvableItemContentRenderData;
  action: Action;
  additionalInfo: IResolvableItemAdditionalInfo;
  status: RESOLVE_ITEM_STATUS;
  leader: IPawnRenderData;
}

export type IResolvableItemContent =
  | IEventCard
  | IBeast
  | IInvention
  | IStructure
  | ITile
  | IRestArrange;

export interface IResolvableItemAdditionalInfo {
  resource?: "left" | "right";
}
