import {IResourceCommittableItem} from "@shared/types/Game/ResourceCommitableItem/ResourceCommittableItem";

export function isCommittableResourcesItem(candidate: any): candidate is IResourceCommittableItem<any> {
    return candidate instanceof Object && "resourceCost" in candidate;
}
