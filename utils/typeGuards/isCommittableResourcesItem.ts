import {IResourceCommittableItem} from "../../interfaces/ResourceCommitableItem/ResourceCommittableItem";
import {IConstruction} from "../../interfaces/ConstructionService/Construction";
import {IInvention} from "../../interfaces/InventionService/Invention";
import {ITile} from "../../interfaces/TileService/ITile";
import {IEventCard} from "../../interfaces/EventService/EventCard";
import {IBeast} from "../../interfaces/Beasts/Beast";
import {ACTION} from "../../interfaces/ACTION";
import {Construction} from "../../Server/server/Game/ConstructionService/Construction";
import {Invention} from "../../Server/server/Game/Inventions/InventionCreator/Invention";
import {EventCard} from "../../Server/server/Game/EventService/EventCardCreator/EventCard";

export function isCommittableResourcesItem(candidate: any): candidate is IResourceCommittableItem<any> {
    return candidate instanceof Object && "resourceCost" in candidate;
}
