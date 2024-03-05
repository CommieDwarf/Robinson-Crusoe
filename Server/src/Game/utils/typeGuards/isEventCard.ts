import {IEventCard} from "../../types/EventService/EventCard";

export const isEventCard = (
    candidate: Object
): candidate is IEventCard => {


    return (
        "cardType" in candidate
    );
};
