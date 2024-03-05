import {IInventionRenderData} from "../../server/src/types/InventionService/Invention";

export const isCardInvention = (
    candidate: Object
): candidate is IInventionRenderData => {
    return "locked" in candidate;
};
