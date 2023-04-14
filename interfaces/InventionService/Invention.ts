import {TERRAIN_TYPE} from "../TileService/ITile";
import {IBasicResources, IBasicResourcesAmount} from "../Resources/Resources";
import {CHARACTER, ICharacter} from "../Characters/Character";
import {IAssignablePawnsItem, IAssignablePawnsItemRenderData} from "../AssignablePawnsItem/AssignablePawnsItem";
import {
    IResourceCommittableItem,
    IResourceCommittableItemRenderData
} from "../ResourceCommitableItem/ResourceCommittableItem";


export interface IInvention extends IResourceCommittableItem {
    name: INVENTION;
    namePL: string;
    locked: boolean;
    inventionType: INVENTION_TYPE;
    isBuilt: boolean;
    requirements: InventionRequirements;
    belongsTo: CHARACTER | null;
    resourceChoice: boolean;
    usable: boolean;
    used: boolean;

    onBuild: () => void;
    onDestruction: () => void;
    onNextRound: () => void;
    use: (character: ICharacter) => void;

    renderData: IInventionRenderData;
}

export interface IInventionRenderData extends IResourceCommittableItemRenderData {
    name: string;
    locked: boolean;
    assignedPawnAmount: number;
    inventionType: INVENTION_TYPE;
    isBuilt: boolean;
}

export interface InventionRequirements {
    inventions: INVENTION[] | null;
    terrainType: TERRAIN_TYPE | null;
}

export enum INVENTION_NORMAL {
    BASKET = "basket",
    BED = "bed",
    BELTS = "belts",
    BOW = "bow",
    CELLAR = "cellar",
    CORRAL = "corral",
    DIARY = "diary",
    DRUMS = "drums",
    FURNACE = "furnace",
    LANTERN = "lantern",
    MOAT = "moat",
    PIT = "pit",
    RAFT = "raft",
    SACK = "sack",
    SHIELD = "shield",
    SLING = "sling",
    WALL = "wall",
}

export enum INVENTION_PERSONAL {
    FIREPLACE = "fireplace",
    SNARE = "snare",
    SHORTCUT = "shortcut",
    SPEAR = "spear",
}

export enum INVENTION_STARTER {
    BRICKS = "bricks",
    MEDICINE = "medicine",
    DAM = "dam",
    FIRE = "fire",
    KNIFE = "knife",
    MAP = "map",
    POT = "pot",
    ROPE = "rope",
    SHOVEL = "shovel",
}

export enum INVENTION_CASTAWAYS {
    AXE = "axe",
    MAST = "mast",
}

export enum INVENTION_TYPE {
    NORMAL = "normal",
    STARTER = "starter",
    PERSONAL = "personal",
    SCENARIO = "scenario",
}

export type INVENTION =
    | INVENTION_NORMAL
    | INVENTION_STARTER
    | INVENTION_PERSONAL
    | INVENTION_CASTAWAYS;
