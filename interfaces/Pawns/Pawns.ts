import { IPawn, IPawnHelper } from "./Pawn";

export type PawnArrayName = "pawns" | "freePawns";

export interface IPawns {
  pawns: (IPawn | IPawnHelper)[];
  freePawns: (IPawn | IPawnHelper)[];
  resetFreePawns: () => void;
  addPawn: (pawn: IPawn, source: PawnArrayName) => void;
  removePawn: (draggableId: string, source: PawnArrayName) => void;
  copyPawnToFreePawns: (draggableId: string) => void;
}
