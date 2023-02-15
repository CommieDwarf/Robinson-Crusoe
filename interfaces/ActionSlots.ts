import { IPawn, IPawnRenderData } from "./Pawns/Pawn";
import { ACTION } from "./ACTION";
import { IGame } from "./Game";

export interface IActionSlotsServiceRenderData {
  slots: Object;
  pawnDropIDAlert: string | null;
}

export type OccupiedSlots = {
  [key in ACTION]: Map<string, IPawn>;
};

export interface IActionSlotService {
  slots: Map<string, IPawn | null>;
  setPawn: (droppableId: string, pawn: IPawn) => void;
  unsetPawn: (droppableId: string) => void;
  clearSlots: () => void;
  getPawn: (droppableId: string) => IPawn | null;
  renderData: IActionSlotsServiceRenderData;
  getOccupiedActionSlots: () => OccupiedSlots;
  pawnDropIDAlert: string | null;
}

export type IActionSlotsRenderData = Map<string, IPawnRenderData | null>;
