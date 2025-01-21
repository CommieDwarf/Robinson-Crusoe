import ActionSlot from "./ActionSlot";
import {IBeastRenderData} from "@shared/types/Game/Beasts/Beast";
import {IConstructionRenderData} from "@shared/types/Game/ConstructionService/Construction";
import {isEventCard} from "@shared/utils/typeGuards/isEventCard";
import {WRECKAGE_CARD} from "@shared/types/Game/EventService/EVENT_CARD";
import {IEventCardRenderData} from "@shared/types/Game/EventService/EventCard";
import {IInventionRenderData} from "@shared/types/Game/InventionService/Invention";
import {ITileRenderData} from "@shared/types/Game/TileService/ITile";
import {getActionSlotDroppableId} from "@shared/utils/getActionSlotDroppableId";
import {Side} from "@shared/types/Game/TileService/TileResourceService";


export default function getActionSlots(
    item: IInventionRenderData |
        IConstructionRenderData | ITileRenderData
        | IBeastRenderData | IEventCardRenderData,
    additionalCost: number,
    side: Side | "" = "",
    name?: string,
) {

    if (item.requiredPawnAmount === null) return [];



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
