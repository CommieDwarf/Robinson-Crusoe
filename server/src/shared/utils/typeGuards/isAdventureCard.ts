import {IAdventureCard} from "@shared/types/Game/AdventureService/AdventureCard";

export const isAdventureCard = (
    candidate: Object
): candidate is IAdventureCard => {
    return (
        "eventOptions" in candidate
    );
};
