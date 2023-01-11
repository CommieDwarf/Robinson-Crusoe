import { IPawn, IPawnRenderData } from "../Pawns/Pawn";
import {
  IConstruction,
  IConstructionRenderData,
} from "../ConstructionService/Construction";
import {
  IInvention,
  IInventionRenderData,
} from "../InventionService/Invention";
import { ITile, ITileRenderData } from "../TileService/ITile";
import { IEventCard, IEventCardRenderData } from "../EventService/EventCard";
import { IBeast, IBeastRenderData } from "../Beasts/Beast";
import { ACTION, Action } from "../ACTION";
import { ActionDiceResults } from "../RollDice/RollDice";

export type Item =
  | IConstruction
  | IInvention
  | ITile
  | IEventCard
  | IBeast
  | ACTION.ARRANGE_CAMP
  | ACTION.REST;

export interface IResolvableItem {
  item: Item;
  id: string;
  leaderPawn: IPawn;
  resolved: boolean;
  action: Action;
  droppableID: string;
  resolveStatus: RESOLVE_ITEM_STATUS;
  renderData: IResolvableItemRenderData;
  helperAmount: number;
  reRolledSuccess: boolean;

  shouldRollDices: boolean;
  shouldReRollSuccess: boolean;
  rollDiceResults: ActionDiceResults | null;
  reRollSuccess: () => void;

  rollDices: () => void;
  resolve: () => void;
}

export enum RESOLVE_ITEM_STATUS {
  PENDING = "pending",
  SUCCESS = "success",
  FAILURE = "failure",
}

export interface IResolvableItemRenderData {
  itemName: string;
  item:
    | IEventCardRenderData
    | IBeastRenderData
    | ITileRenderData
    | IConstructionRenderData
    | IInventionRenderData
    | ACTION.REST
    | ACTION.ARRANGE_CAMP;
  id: string;
  leaderPawn: IPawnRenderData;
  droppableID: string;
  resolveStatus: RESOLVE_ITEM_STATUS;
  action: Action;
  shouldRollDices: boolean;
  shouldReRollSuccess: boolean;
  reRolledSuccess: boolean;

  rollDiceResults: ActionDiceResults | null;
}
