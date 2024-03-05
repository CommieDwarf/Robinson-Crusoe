import {IGame} from "../server/src/types/Game";
import {ACTION, ACTION_ITEM} from "../server/src/types/ACTION";
import {getDroppableIdObject} from "./getActionSlotDroppableId";
import {CONSTRUCTION, IConstruction} from "../server/src/types/ConstructionService/Construction";
import {IInvention, INVENTION} from "../server/src/types/InventionService/Invention";
import {Side} from "../server/src/types/TileService/TileResourceService";
import {IEventCard} from "../server/src/types/EventService/EventCard";
import {ITile} from "../server/src/types/TileService/ITile";
import {IBeast} from "../server/src/types/Beasts/Beast";

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
