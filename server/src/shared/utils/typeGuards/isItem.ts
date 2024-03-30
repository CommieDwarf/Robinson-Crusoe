import {IItem, ITEM} from "@shared/types/Game/Equipment/Item";

export function isItem(candidate: Object): candidate is IItem {
    return "name" in candidate && Object.values(ITEM).includes(candidate.name as ITEM);
}

export function isItemRenderData(candidate: Object): candidate is IItem {
    return "name" in candidate && Object.values(ITEM).includes(candidate.name as ITEM);
}
