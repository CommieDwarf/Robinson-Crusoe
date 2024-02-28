import {IAdventureCard} from "../../interfaces/AdventureService/AdventureCard";

export const isAdventureCard = (
    candidate: Object
): candidate is IAdventureCard => {
    return (
        "eventOptions" in candidate
    );
};
