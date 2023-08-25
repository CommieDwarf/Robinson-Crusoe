import {getCardPawnDraggableId} from "./getCardPawnDraggableId";


export function getCardPawnDroppableId(cardName: string, cardType: string) {
    return getCardPawnDraggableId(cardName, cardType) + "-slot"
}
