import {IGame} from "../interfaces/Game";
import {ACTION, ACTION_ITEM} from "../interfaces/ACTION";
import {getDroppableIdObject} from "./getActionSlotDroppableId";
import {CONSTRUCTION, IConstruction} from "../interfaces/ConstructionService/Construction";
import {IInvention, INVENTION} from "../interfaces/InventionService/Invention";
import {Side} from "../interfaces/TileService/TileResourceService";
import {IEventCard} from "../interfaces/EventService/EventCard";
import {ITile} from "../interfaces/TileService/ITile";
import {IBeast} from "../interfaces/Beasts/Beast";

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
