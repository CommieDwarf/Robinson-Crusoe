import ActionSlot from "./ActionSlot";

import {IInventionRenderData} from "../../../interfaces/InventionService/Invention";
import {IConstructionRenderData} from "../../../interfaces/ConstructionService/Construction";
import {getActionSlotDroppableId} from "../../../utils/getActionSlotDroppableId";
import {ITileRenderData} from "../../../interfaces/TileService/ITile";
import {IBeastRenderData} from "../../../interfaces/Beasts/Beast";
import {IEventCardRenderData} from "../../../interfaces/EventService/EventCard";
import {Side} from "../../../interfaces/TileService/TileResourceService";
import {isEventCard} from "../../../utils/typeGuards/isEventCard";
import {WRECKAGE_CARD} from "../../../interfaces/EventService/EVENT_CARD";


export default function getActionSlots(
    item: IInventionRenderData |
        IConstructionRenderData | ITileRenderData
        | IBeastRenderData | IEventCardRenderData,
    additionalCost: number,
    side: Side | "" = "",
    name?: string,
) {

    if (item.requiredPawnAmount === null) return [];

    let identifier;


    const actionSlots = [];
    if (!name) {
        name = "id" in item ? String(item.id) : item.name;
    }

    let actionSlotAmount;


    // @ts-ignore
    if (isEventCard(item) && !(Object.values(WRECKAGE_CARD).includes(item.name))) {
        actionSlotAmount = item.requiredPawnAmount
    } else {
        actionSlotAmount = item.requiredPawnAmount + 1
    }


    for (let i = 0; i < actionSlotAmount; i++) {
        const actionSlotId = getActionSlotDroppableId(item.uniqueAction, name, side ? side : null, i);
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
