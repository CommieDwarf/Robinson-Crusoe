import {IGame} from "../interfaces/Game";
import {CONSTRUCTION} from "../interfaces/ConstructionService/Construction";
import {INVENTION} from "../interfaces/InventionService/Invention";
import {ACTION} from "../interfaces/ACTION";
import {IEventCard} from "../interfaces/EventService/EventCard";

export function getItemFromDroppableId(droppableId: string, game: IGame) {
    if (droppableId.includes("threat")) {
        if (droppableId.includes("left")) {
            return game.eventService.leftSlot as IEventCard;
        } else {
            return game.eventService.rightSlot as IEventCard;
        }
    } else if (droppableId.includes("hunt")) {
        return game.beastService.getBeastFromDeck();
    } else if (droppableId.includes("invention")) {
        let name = droppableId.split("-")[1] as INVENTION;
        return game.inventionService.getInvention(name);
    } else if (droppableId.includes("construction")) {
        let name = droppableId.split("-")[1] as CONSTRUCTION;
        return game.constructionService.getConstruction(name);
    } else if (droppableId.includes("tile")) {
        let id = droppableId.split("-")[1];
        return game.tileService.getTile(parseInt(id));
    } else if (droppableId.includes("rest")) {
        return ACTION.REST;
    } else if (droppableId.includes("arrange camp")) {
        return ACTION.ARRANGE_CAMP;
    }

    return null;
}
