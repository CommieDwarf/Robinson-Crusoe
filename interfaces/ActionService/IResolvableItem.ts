import { IPawn, IPawnRenderData } from "../Pawns/Pawn";
import { IConstruction } from "../ConstructionService/Construction";
import { IInvention } from "../InventionService/Invention";
import { ITile } from "../TileService/ITile";
import { IEventCard } from "../EventService/EventCard";
import { IBeast } from "../Beasts/Beast";
import { ACTION } from "../ACTION";

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
  action: ACTION;
  rolled: boolean;
  droppableID: string;
  renderData: IResolvableItemRenderData;

  resolve: () => void;
}

export interface IResolvableItemRenderData {
  itemName: string;
  id: string;
  leaderPawn: IPawnRenderData;
  resolved: boolean;
  action: ACTION;
  rolled: boolean;
}
