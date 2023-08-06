import { IAdventureCard } from "../interfaces/AdventureService/AdventureCard";
import { IEventCard } from "../interfaces/EventService/EventCard";

export const isEventCard = (
    candidate: IEventCard | IAdventureCard
): candidate is IEventCard => {
    let e: IEventCard;
    let a: IAdventureCard;
    return (
        "assignedPawnAmount" in candidate
    );
};
