import {IBasicResources, IBasicResourcesAmount} from "../Resources/Resources";
import {IAssignablePawnsItem, IAssignablePawnsItemRenderData} from "../AssignablePawnsItem/AssignablePawnsItem";
import {
    IResourceCommittableItem,
    IResourceCommittableItemRenderData, SingleResourceRequirement
} from "../ResourceCommitableItem/ResourceCommittableItem";

export type resource = "wood" | "leather";

export interface IConstructionRenderData extends IResourceCommittableItemRenderData<resource> {
    name: CONSTRUCTION;
    lvl: number;
    locked: boolean;
    canResourceBeSwitched: boolean;
    temporaryBoost: number;

}

export interface IConstruction extends IResourceCommittableItem<resource> {
    name: CONSTRUCTION;
    namePL: string;
    lvl: number;
    locked: boolean;
    renderData: IConstructionRenderData;
    resourceChoice: boolean;

    temporaryBoost: number;

    boostedLvl: number;

    incrTemporaryBoost: (value: number) => void;
    resetTemporaryBoost: () => void;
}

export enum CONSTRUCTION {
    SHELTER = "shelter",
    ROOF = "roof",
    PALISADE = "palisade",
    WEAPON = "weapon",
}
