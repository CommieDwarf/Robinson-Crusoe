import {IBasicResources, IBasicResourcesAmount} from "../Resources/Resources";
import {IAssignablePawnsItem, IAssignablePawnsItemRenderData} from "../AssignablePawnsItem/AssignablePawnsItem";

export interface IConstructionRenderData extends IAssignablePawnsItemRenderData {
    name: string;
    lvl: number;
    committedResources: IBasicResourcesAmount;
    cost: IBasicResourcesAmount;
    locked: boolean;
}

export interface IConstruction extends IAssignablePawnsItem {
    name: CONSTRUCTION;
    namePL: string;
    lvl: number;
    committedResources: IBasicResources;
    cost: IBasicResources;
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
