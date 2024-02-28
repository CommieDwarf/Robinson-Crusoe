import {IInventionRenderData} from "../../interfaces/InventionService/Invention";

export const isCardInvention = (
    candidate: Object
): candidate is IInventionRenderData => {
    return "locked" in candidate;
};
