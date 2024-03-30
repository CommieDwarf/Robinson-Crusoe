import {IInventionRenderData} from "@shared/types/Game/InventionService/Invention";

export const isInventionRenderData = (
    candidate: Object
): candidate is IInventionRenderData => {
    return "locked" in candidate;
};
