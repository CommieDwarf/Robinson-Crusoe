import {
	IPawn,
	IPawnOwner,
	IPawnOwnerRenderData,
	IPawnRenderData,
	PAWN_HELPER_ACTION,
} from "./Pawn";

export type PawnArrayName = "pawns" | "freePawns";

export interface IPawnService<Owner extends IPawnOwner> {
	pawns: IPawn<Owner>[];
	freePawns: IPawn<Owner>[];
	resetFreePawns: () => void;
	removePawn: (draggableId: string, source: PawnArrayName) => void;
	copyPawnToFreePawns: (draggableId: string) => void;

	addPawn: (disposable: boolean, action: PAWN_HELPER_ACTION | null) => void;

	destroyPawn: (draggableId: string) => void;
	destroyAllPawns: () => void;
	initPawns: (
		initialQuantity: number,
		disposable: boolean,
		action: PAWN_HELPER_ACTION | null
	) => void;
	renderData: IPawnServiceRenderData<Owner["renderData"]>;
}

export interface IPawnServiceRenderData<Owner extends IPawnOwnerRenderData> {
	freePawns: IPawnRenderData<Owner>[];
	pawns: IPawnRenderData<Owner>[];
}
