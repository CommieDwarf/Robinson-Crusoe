import {IAssignablePawnsItem, IAssignablePawnsItemRenderData} from "../AssignablePawnsItem/AssignablePawnsItem";
import {IBasicResourcesAmount} from "../Resources/Resources";

export interface ResourceRequirement<Resource> {
    resource: SingleResourceRequirement<Resource>,
    optionalResource: SingleResourceRequirement<Resource> | null,
}

export interface SingleResourceRequirement<Resource> {
    type: Resource,
    amount: number,
}

export interface IResourceCommittableItem<Resource> extends IAssignablePawnsItem {

    resourceCost: SingleResourceRequirement<Resource> | null;
    optionalResourceCost: SingleResourceRequirement<Resource> | null;
    committedResources: SingleResourceRequirement<Resource> | null;

    commitResource: () => void;
    unCommitResources: () => void;

    consumeCommittedResources: () => void;
    canCommitResource: (optional: boolean) => boolean;

    renderData: IResourceCommittableItemRenderData<Resource>
}


export interface IResourceCommittableItemRenderData<Resource> extends IAssignablePawnsItemRenderData {
    committedResources: SingleResourceRequirement<Resource> | null,
    resourceCost: SingleResourceRequirement<Resource> | null;
    optionalResourceCost: SingleResourceRequirement<Resource> | null;
}
