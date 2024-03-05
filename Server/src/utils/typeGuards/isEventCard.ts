import {IAdventureCard} from "../../../shared/types/AdventureService/AdventureCard";
import {IEventCard} from "../../../shared/types/EventService/EventCard";

export const isEventCard = (
    candidate: Object
): candidate is IEventCard => {


    return (
        "cardType" in candidate
    );
};
