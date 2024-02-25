import ActionSlot from "./ActionSlot";

import {IInventionRenderData} from "../../../interfaces/InventionService/Invention";
import {IConstructionRenderData} from "../../../interfaces/ConstructionService/Construction";
import {getDroppableID} from "../../../utils/getDroppableID";
import {ITileRenderData} from "../../../interfaces/TileService/ITile";
import {IBeastRenderData} from "../../../interfaces/Beasts/Beast";
import {IEventCardRenderData} from "../../../interfaces/EventService/EventCard";
import {Side} from "../../../interfaces/TileService/TileResourceService";


export default function getActionSlots(
    item: IInventionRenderData |
        IConstructionRenderData | ITileRenderData
        | IBeastRenderData | IEventCardRenderData,
    additionalCost: number,
    side: Side | "" = "") {

    if (item.requiredPawnAmount === null) return [];

    let identifier;

    if ("id" in item) {
        identifier = item.id;
    } else {
        identifier = item.name;
    }

    const actionSlots = [];


    for (let i = 0; i < item.requiredPawnAmount + 1; i++) {
        const actionSlotId = getDroppableID(item.uniqueAction, identifier, side, i);
        const role = i === 0 ? "leader" : "helper";
        actionSlots.push(
            <ActionSlot
                type={role}
                action={item.action}
                uniqueAction={item.uniqueAction}
                id={actionSlotId}
                key={actionSlotId}
            />
        )
    }

    return actionSlots;
}
