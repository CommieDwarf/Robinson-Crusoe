import {IMysteryCardRenderData} from "../../interfaces/MysteryService/MysteryCard";

export const isMysteryCard = (
    candidate: Object
): candidate is IMysteryCardRenderData => {
    return (
        "drawLabel" in candidate
    );
};
