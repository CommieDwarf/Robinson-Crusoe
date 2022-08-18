import { IPawn } from "./Pawns/Pawn";

export interface IActionSlotsService {
  slots: Map<string, IPawn | null>;
  setPawn: (droppableId: string, pawn: IPawn) => void;
  unsetPawn: (droppableId: string) => void;
  clearSlots: () => void;
  getPawn: (droppableId: string) => IPawn | null;
  setPawns: (destinationId: string, sourceId: string) => void;
}
