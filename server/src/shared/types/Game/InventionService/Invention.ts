import {TERRAIN_TYPE} from "../TileService/ITile";
import {CHARACTER} from "../Characters/Character";
import {
    IResourceCommittableItem,
    IResourceCommittableItemRenderData
} from "../ResourceCommitableItem/ResourceCommittableItem";
import {IPlayerCharacter} from "../Characters/PlayerCharacter";
import {IPawnService, IPawnServiceRenderData} from "../Pawns/PawnService";
import {PawnOwner} from "../PawnOwner/PawnOwner";


export type InventionResource = "wood" | 'leather'


export interface IInvention extends IResourceCommittableItem<InventionResource>, PawnOwner<IInventionRenderData> {
    name: INVENTION;
    locked: boolean;
    inventionType: INVENTION_TYPE;
    isBuilt: boolean;
    requirements: InventionRequirements;
    belongsTo: CHARACTER | null;
    resourceChoice: boolean;
    used: boolean;

    canBeUsed: boolean;

    onBuild: () => void;
    onDestruction: () => void;
    onNextRound: () => void;
    use: (character: IPlayerCharacter) => void;

    pawnService: IPawnService<IInvention>;

    renderData: IInventionRenderData;

}

export interface IInventionRenderData extends IResourceCommittableItemRenderData<InventionResource> {
    name: INVENTION;
    locked: boolean;
    assignedPawnAmount: number;
    inventionType: INVENTION_TYPE;
    isBuilt: boolean;
    canBeUsed: boolean;
    pawnService: IPawnServiceRenderData<IInventionRenderData>;
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
