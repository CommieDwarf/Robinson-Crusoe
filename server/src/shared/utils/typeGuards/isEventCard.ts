import {IEventCard} from "@shared/types/Game/EventService/EventCard";

export const isEventCard = (
    candidate: Object
): candidate is IEventCard => {


    return (
        "cardType" in candidate
    );
};
