import {IGame} from "../types/Game";
import {ACTION, ACTION_ITEM} from "../types/ACTION";
import {getDroppableIdObject} from "./getActionSlotDroppableId";
import {CONSTRUCTION, IConstruction} from "../types/ConstructionService/Construction";
import {IInvention, INVENTION} from "../types/InventionService/Invention";
import {Side} from "../types/TileService/TileResourceService";
import {IEventCard} from "../types/EventService/EventCard";
import {ITile} from "../types/TileService/ITile";
import {IBeast} from "../types/Beasts/Beast";

export function getItemFromDroppableId(droppableId: string, game: IGame): IEventCard | IConstruction | IInvention | ITile | IBeast | ACTION.ARRANGE_CAMP | ACTION.REST | null {
    const obj = getDroppableIdObject(droppableId);

    switch (true) {
        case obj.itemType === ACTION.THREAT:
            return game.eventService[obj.side as Side];
        case obj.itemType === ACTION_ITEM.CONSTRUCTION:
            return game.constructionService.getConstruction(obj.name as CONSTRUCTION);
        case obj.itemType === ACTION_ITEM.INVENTION:
            return game.inventionService.getInvention(obj.name as INVENTION);
        case obj.itemType === ACTION.EXPLORE || obj.itemType === ACTION.GATHER:
            return game.tileService.getTile(Number(obj.name));
        case obj.itemType === ACTION.HUNT:
            return game.beastService.peekBeastFromDeck();
        default:
            return obj.itemType as ACTION.ARRANGE_CAMP || ACTION.REST;
    }
}
