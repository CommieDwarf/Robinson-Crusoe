import {ACTION, ACTION_ITEM, UniqueAction} from "../interfaces/ACTION";


export function getDroppableID(
    itemType: UniqueAction,
    name: string | number,
    side: "left" | "right" | "",
    id: number
): string {
    const role = id === 0 ? "leader" : "helper";
    switch (itemType) {
        case ACTION_ITEM.CONSTRUCTION:
            return `construction-${name}-${role}-${id}`;
        case ACTION_ITEM.INVENTION:
            return `invention-${name}-${role}-${id}`;
        case ACTION.EXPLORE:
            return `tile-${name}-explore-${role}-${id}`;
        case ACTION.GATHER:
            return `tile-${name}-gather-${side}-${role}-${id}`;
        case ACTION.REST:
            return `rest-leader-${id}`;
        case ACTION.ARRANGE_CAMP:
            return `arrange camp-leader-${id}`;
        case ACTION.THREAT:
            return `threat-${side}-${role}-${id}`;
        case ACTION.HUNT:
            return `hunt-${role}-${id}`;
    }
}
