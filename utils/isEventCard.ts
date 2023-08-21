import { IAdventureCard } from "../interfaces/AdventureService/AdventureCard";
import { IEventCard } from "../interfaces/EventService/EventCard";

export const isEventCard = (
    candidate: Object
): candidate is IEventCard => {
    return (
        "assignedPawnAmount" in candidate
    );
};
