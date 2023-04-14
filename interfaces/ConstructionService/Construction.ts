import {IBasicResources, IBasicResourcesAmount} from "../Resources/Resources";
import {IAssignablePawnsItem, IAssignablePawnsItemRenderData} from "../AssignablePawnsItem/AssignablePawnsItem";
import {
    IResourceCommittableItem,
    IResourceCommittableItemRenderData
} from "../ResourceCommitableItem/ResourceCommittableItem";

export interface IConstructionRenderData extends IResourceCommittableItemRenderData {
    name: string;
    lvl: number;
    locked: boolean;
}

export interface IConstruction extends IResourceCommittableItem {
    name: CONSTRUCTION;
    namePL: string;
    lvl: number;
    locked: boolean;
    renderData: IConstructionRenderData;
    resourceChoice: boolean;
}

export enum CONSTRUCTION {
    SHELTER = "shelter",
    ROOF = "roof",
    PALISADE = "palisade",
    WEAPON = "weapon",
}
