import { IPawn, IPawnRenderData } from "./Pawns/Pawn";
import { ACTION } from "./ACTION";

export interface IActionSlotsServiceRenderData {
  slots: Object;
}

export type SlotsOccupied = {
  [key in ACTION]: Map<string, IPawn>;
};

export interface IActionSlotService {
  slots: Map<string, IPawn | null>;
  setPawn: (droppableId: string, pawn: IPawn) => void;
  unsetPawn: (droppableId: string) => void;
  clearSlots: () => void;
  getPawn: (droppableId: string) => IPawn | null;
  renderData: IActionSlotsServiceRenderData;
  slotsOccupiedAndCategorized: SlotsOccupied;
}

export type IActionSlotsRenderData = Map<string, IPawnRenderData | null>;
