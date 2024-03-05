import {IMysteryCardRenderData} from "../../types/MysteryService/MysteryCard";

export const isMysteryCard = (
    candidate: Object
): candidate is IMysteryCardRenderData => {
    return (
        "drawLabel" in candidate
    );
};
