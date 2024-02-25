import {TERRAIN_TYPE} from "../TileService/ITile";
import {CHARACTER} from "../Characters/Character";
import {
    IResourceCommittableItem,
    IResourceCommittableItemRenderData
} from "../ResourceCommitableItem/ResourceCommittableItem";
import {IPlayerCharacter} from "../Characters/PlayerCharacter";
import {IPawnHelper, IPawnHelperRenderData, PAWN_HELPER_ACTION} from "../Pawns/Pawn";


export type InventionResource = "wood" | 'leather'

export interface CardPawnHelper {
    action: PAWN_HELPER_ACTION,
    pawn: IPawnHelper | null;
}

export interface CardPawnHelperRenderData {
    action: PAWN_HELPER_ACTION,
    pawn: IPawnHelperRenderData | null;
}

export interface IInvention extends IResourceCommittableItem<InventionResource> {
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
    helperPawn: CardPawnHelper | null;

    onBuild: () => void;
    onDestruction: () => void;
    onNextRound: () => void;
    use: (character: IPlayerCharacter) => void;

    unsetPawn: () => void;

    resetHelperPawn: () => void;
    renderData: IInventionRenderData;
}

export interface IInventionRenderData extends IResourceCommittableItemRenderData<InventionResource> {
    name: string;
    locked: boolean;
    assignedPawnAmount: number;
    inventionType: INVENTION_TYPE;
    isBuilt: boolean;

    usable: boolean;
    helperPawn: CardPawnHelperRenderData | null;
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
