import {ACTION, ACTION_ITEM, UniqueAction} from "../ACTION";
import {IGame} from "../Game";


export interface IAssignablePawnsItem {

    action: ACTION;
    actionItem: ACTION_ITEM;
    assignedPawnAmount: number;
    requiredPawnAmount: number;
    incrPawnAmount: () => void;
    decrPawnAmount: () => void;
    resetPawnAmount: () => void;

    getComputedRequiredPawnAmount: () => number;

    uniqueAction: UniqueAction;
}

export interface IAssignablePawnsItemRenderData {
    action: ACTION;
    actionItem: ACTION_ITEM;
    assignedPawnAmount: number;
    requiredPawnAmount: number;

    uniqueAction: UniqueAction
}

