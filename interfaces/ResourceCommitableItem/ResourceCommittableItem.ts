import {IAssignablePawnsItem, IAssignablePawnsItemRenderData} from "../AssignablePawnsItem/AssignablePawnsItem";
import {IBasicResourcesAmount} from "../Resources/Resources";

export interface ResourceRequirement {
    resource: SingleResourceRequirement,
    optionalResource: SingleResourceRequirement | null,
}

export interface SingleResourceRequirement {
    type: keyof IBasicResourcesAmount,
    amount: number,
}

export interface IResourceCommittableItem extends IAssignablePawnsItem {

    resourceCost: SingleResourceRequirement | null;
    optionalResourceCost: SingleResourceRequirement | null;
    committedResources: SingleResourceRequirement | null;

    commitResource: (optional: boolean) => void;
    unCommitResources: () => void;

    consumeCommittedResources: () => void;
    canCommitResource: (optional: boolean) => boolean;

    renderData: IResourceCommittableItemRenderData
}


export interface IResourceCommittableItemRenderData extends IAssignablePawnsItemRenderData {
    committedResources: SingleResourceRequirement | null,
    resourceCost: SingleResourceRequirement | null;
    optionalResourceCost: SingleResourceRequirement | null;
}