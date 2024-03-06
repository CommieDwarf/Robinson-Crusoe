import {IInventionRenderData} from "@shared/types/Game/InventionService/Invention";

export const isCardInvention = (
    candidate: Object
): candidate is IInventionRenderData => {
    return "locked" in candidate;
};
