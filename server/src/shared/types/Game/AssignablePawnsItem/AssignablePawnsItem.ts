import { ACTION, ACTION_ITEM, UniqueAction } from "../ACTION";

export interface IAssignablePawnsItem {
	action: ACTION;
	actionItem: ACTION_ITEM;
	assignedPawnAmount: number;
	requiredPawnAmount: number | null;
	incrPawnAmount: () => void;
	decrPawnAmount: () => void;
	resetPawnAmount: () => void;

	getComputedRequiredPawnAmount: () => number | null;

	uniqueAction: UniqueAction;
}

export interface IAssignablePawnsItemRenderData {
	action: ACTION;
	actionItem: ACTION_ITEM;
	assignedPawnAmount: number;
	requiredPawnAmount: number | null;

	uniqueAction: UniqueAction;
}
