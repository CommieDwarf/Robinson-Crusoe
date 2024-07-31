import {IAssignablePawnsItem, IAssignablePawnsItemRenderData} from "../AssignablePawnsItem/AssignablePawnsItem";
import {IPawnOwner} from "@shared/types/Game/Pawns/Pawn";

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
    secondaryResourceCost: SingleResourceRequirement<Resource> | null;
    committedResources: SingleResourceRequirement<Resource> | null;

    commitResource: (pawnOwner: IPawnOwner) => void;
    unCommitResources: (pawnOwner: IPawnOwner) => void;

    consumeCommittedResources: () => void;
    canCommitResource: (optionalResource: boolean, pawnOwned: IPawnOwner) => boolean;


    renderData: IResourceCommittableItemRenderData<Resource>
}


export interface IResourceCommittableItemRenderData<Resource> extends IAssignablePawnsItemRenderData {
    committedResources: SingleResourceRequirement<Resource> | null,
    resourceCost: SingleResourceRequirement<Resource> | null;
    optionalResourceCost: SingleResourceRequirement<Resource> | null;
    personalResourceUsed: boolean;
}
