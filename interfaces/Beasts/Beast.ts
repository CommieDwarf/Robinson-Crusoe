import {IAssignablePawnsItem, IAssignablePawnsItemRenderData} from "../AssignablePawnsItem/AssignablePawnsItem";
import { IBasicResources } from "../Resources/Resources";

export interface IBeastRenderData extends IAssignablePawnsItemRenderData {
    name: string;
    namePL: string;
}

export interface IBeast extends IAssignablePawnsItem {
    name: string;
    namePL: string;
    strength: number;
    weaponLoss: number;
    requiredPawnAmount: number;
    reward: IBasicResources;
    renderData: IBeastRenderData;
    applySpecialEffect: () => void;
}

export enum BEAST {
    ALLIGATOR = "alligator",
    BEAR = "bear",
    BIRDS = "birds",
    BOA = "boa",
    CHAMOIS = "chamois",
    CHEETAH = "cheetah",
    FOX = "fox",
    GOATS = "goats",
    GORILLA = "gorilla",
    IGUANA = "iguana",
    JAGUAR = "jaguar",
    PUMA = "puma",
    TAPIR = "tapir",
    TIGER = "tiger",
    WILD_DOG = "wild dog",
    WILD_PIG = "wild pig",
}
