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

    temporaryBoost: number;
}

export interface IConstruction extends IResourceCommittableItem {
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
