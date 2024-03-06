import {ACTION, UniqueAction} from "@shared/types/Game/ACTION";


export function getActionSlotDroppableId(
    itemType: UniqueAction,
    name: string | number | null,
    side: "left" | "right" | null,
    id: number
): string {

    const role = id === 0 || itemType === ACTION.ARRANGE_CAMP || itemType === ACTION.REST ? "leader" : "helper";

    if (itemType === ACTION.THREAT || itemType === ACTION.HUNT) {
        name = " ";
    }
    return `${itemType}-${name}-${side ? side : " "}-${role}-${id}`;
}


interface DroppableIdObject {
    itemType: UniqueAction,
    name: string,
    side: "left" | "right" | " ",
    role: "leader" | "helper" | " ",
    id: string;
}


export function getDroppableIdObject(droppableId: string): DroppableIdObject {
    const arr = droppableId.split("-");

    return {
        itemType: arr[0],
        name: arr[1],
        side: arr[2],
        role: arr[3],
        id: arr[4],
    } as DroppableIdObject;
}
