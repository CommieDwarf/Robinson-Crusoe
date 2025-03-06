import { IPawn, IPawnRenderData } from "@shared/types/Game/Pawns/Pawn";

export interface PawnMovementData {
	draggableId: string;
	droppableId: string;
}

export interface IGlobalPawnService {
	handlePawnMovement: (
		source: PawnMovementData,
		target: PawnMovementData
	) => void;
	resetPawns: () => void;
	addToItemPawns: (pawn: IPawn[] | IPawn) => void;

	removeItemPawn: (draggableId: string) => void;
	renderData: IGlobalPawnServiceRenderData;
}

export interface IGlobalPawnServiceRenderData {
	allPawns: IPawnRenderData<any>[];
}
