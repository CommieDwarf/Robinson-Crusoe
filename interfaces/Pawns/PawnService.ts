import { IPawn, IPawnHelper, IPawnRenderData } from "./Pawn";

export type PawnArrayName = "pawns" | "freePawns";

export interface IPawnService {
  pawns: (IPawn | IPawnHelper)[];
  freePawns: (IPawn | IPawnHelper)[];
  resetFreePawns: () => void;
  addPawn: (pawn: IPawn | IPawnHelper) => void;
  removePawn: (draggableId: string, source: PawnArrayName) => void;
  copyPawnToFreePawns: (draggableId: string) => void;

  renderData: IPawnServiceRenderData;
}

export interface IPawnServiceRenderData {
  freePawns: IPawnRenderData[];
}
