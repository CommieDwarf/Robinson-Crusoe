import {IAdventureCard, IAdventureCardRenderData} from "@shared/types/Game/AdventureService/AdventureCard";
import {IMysteryCardRenderData} from "@shared/types/Game/MysteryService/MysteryCard";

export const isAdventureCard = (
    candidate: Object
): candidate is IAdventureCard => {
    return (
        "action" in candidate
    );
};

export const isAdventureCardRenderData = (candidate: IMysteryCardRenderData | IAdventureCardRenderData): candidate is IAdventureCardRenderData => {
    return (
        "action" in candidate
    );
}
