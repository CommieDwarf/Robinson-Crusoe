import { IPawn, IPawnRenderData } from "./Pawns/Pawn";

export interface IActionSlotsServiceRenderData {
  slots: Object;
}

export interface SlotsOccupied {
  threat: Map<string, IPawn>;
  hunt: Map<string, IPawn>;
  build: Map<string, IPawn>;
  gather: Map<string, IPawn>;
  explore: Map<string, IPawn>;
  arrangeCamp: Map<string, IPawn>;
  rest: Map<string, IPawn>;
}

export interface IActionSlotsService {
  slots: Map<string, IPawn | null>;
  setPawn: (droppableId: string, pawn: IPawn) => void;
  unsetPawn: (droppableId: string) => void;
  clearSlots: () => void;
  getPawn: (droppableId: string) => IPawn | null;
  renderData: IActionSlotsServiceRenderData;
  slotsOccupiedAndCategorized: SlotsOccupied;
}

export type IActionSlotsRenderData = Map<string, IPawnRenderData | null>;
