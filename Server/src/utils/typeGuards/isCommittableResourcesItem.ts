import {
    IResourceCommittableItem
} from "../../../shared/types/ResourceCommitableItem/ResourceCommittableItem";
import {IConstruction} from "../../../shared/types/ConstructionService/Construction";
import {IInvention} from "../../../shared/types/InventionService/Invention";
import {ITile} from "../../../shared/types/TileService/ITile";
import {IEventCard} from "../../../shared/types/EventService/EventCard";
import {IBeast} from "../../../shared/types/Beasts/Beast";
import {ACTION} from "../../../Server/src/ACTION";
import {Construction} from "../../Game/ConstructionService/Construction";
import {Invention} from "../../Game/Inventions/InventionCreator/Invention";
import {EventCard} from "../../Game/EventService/EventCardCreator/EventCard";

export function isCommittableResourcesItem(candidate: any): candidate is IResourceCommittableItem<any> {
    return candidate instanceof Object && "resourceCost" in candidate;
}
