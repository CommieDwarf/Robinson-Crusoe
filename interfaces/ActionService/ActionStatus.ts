import { Action } from "../Action";
import { IPawn, IPawnRenderData } from "../Pawns/Pawn";
import { EventCard } from "../../server/Classes/Threat/EventCard";
import { Beast } from "../../server/Classes/Beasts/Beast";
import { IEventCard, IEventCardRenderData } from "../Threat/EventCard";
import { IBeast, IBeastRenderData } from "../Beasts/Beast";
import { IInvention, IInventionRenderData } from "../Inventions/Invention";
import { IStructure, IStructureRenderData } from "../Structures/Structure";
import { ITile, ITileRenderData } from "../Tiles/Tile";
import {
  IRestArrange,
  IRestArrangeRenderData,
} from "../AdditionalActivity/RestArrange";

export enum RESOLVE_ITEM_STATUS {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  PENDING = "PENDING",
}

type IResolvableItemTypeRenderType =
  | IEventCardRenderData
  | IBeastRenderData
  | IInventionRenderData
  | IStructureRenderData
  | ITileRenderData
  | IRestArrangeRenderData;

export interface IResolvableItemRenderData {
  droppableId: string;
  type: IResolvableItemTypeRenderType;
  status: RESOLVE_ITEM_STATUS;
  leader: IPawnRenderData;
}

export type IResolvableItemType =
  | IEventCard
  | IBeast
  | IInvention
  | IStructure
  | ITile
  | IRestArrange;

export interface IResolvableItem {
  droppableId: string;
  type: IResolvableItemType;
  status: RESOLVE_ITEM_STATUS;
  leader: IPawn;
  helpers: number;
  incrementHelpers: () => void;
  renderData: IResolvableItemRenderData;
}

export interface IActionStatusRenderData {
  items: IResolvableItemRenderData[];
}

export interface IActionStatus {
  action: Action;
  eventToken: boolean;
  reRollToken: boolean;
  additionalPawnRequired: boolean;
  items: IResolvableItem[];
  resolveNextItem: () => void;
  finished: boolean;
  renderData: IActionStatusRenderData;
  updateItems: () => void;
}
