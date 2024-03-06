import {Side} from "@shared/types/Game/TileService/TileResourceService";
import {ACTION, ACTION_ITEM} from "@shared/types/Game/ACTION";
import {IBeast} from "@shared/types/Game/Beasts/Beast";
import {IInvention, INVENTION} from "@shared/types/Game/InventionService/Invention";
import {CONSTRUCTION, IConstruction} from "@shared/types/Game/ConstructionService/Construction";
import {IEventCard} from "@shared/types/Game/EventService/EventCard";
import {ITile} from "@shared/types/Game/TileService/ITile";
import {getDroppableIdObject} from "@shared/utils/getActionSlotDroppableId";
import {IGame} from "@shared/types/Game/Game";


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
