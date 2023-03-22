import {
    GatherableResourceAmount,
    ITileResourceService,
    ITileResourceServiceRenderData,
    Side,
    TILE_RESOURCE_ACTION,
} from "./TileResourceService";
import {FixedTileResources} from "./TileResourceInfo";

export interface ITile {
    position: TilePosition;
    id: number;
    camp: boolean;
    show: boolean;
    tileResourceService: ITileResourceService | null;
    requiredHelperAmount: number;
    modifiers: TileModifiers;
    markedForAction: MarkedForAction | null;
    builtStructures: ITileBuiltStructures;

    renderData: ITileRenderData;

    isMarkedForAction: () => boolean;
    isSideRequiredPawnsSatisfied: (side: Side) => boolean;
    isAnySideRequiredPawnsSatisfied: () => boolean;


    canCampBeSettled: boolean;
    canResourceBeDepleted: (side: "left" | "right") => boolean;
    hasBasicResource: (resource: "wood" | "food") => boolean;
    canBeGathered: (side: "left" | "right") => boolean;

    getSideByResource: (resource: TileResource) => "left" | "right" | null;
    getGatherableResourceAmount: (
        side: "left" | "right"
    ) => GatherableResourceAmount | null;


    triggerAction: () => void;
    reveal: (resources: FixedTileResources) => void;
    resetStructures: () => void;
    setStructureLvl: (structure: BuiltTileStructure, amount: number) => void;

    incrDecrSideAssignedPawn: (side: Side, amount: number) => void;

    resetSideAssignedPawns: () => void;
    incrementStructureLvl: (
        structure: BuiltTileStructure,
        amount: number
    ) => void;
    decrementStructureLvl: (
        structure: BuiltTileStructure,
        amount: number
    ) => void;

    markTileForActon: (actionName: TILE_ACTION, source: string) => void;

    depleteResource: (side: "left" | "right", source: string) => void;
    unDepleteResource: (side: "left" | "right", source: string) => void;
    addResourceModifier: (side: Side, source: string) => void;
    removeResourceModifier: (side: Side, source: string) => void;
    setTileModifier: (
        modifier: keyof TileModifiers,
        value: boolean,
        source: string
    ) => void;
    clearResourceModifiers: () => void;
    markResourceForAction: (
        side: Side,
        actionName: TILE_RESOURCE_ACTION,
        source: string
    ) => void;
    triggerResourceAction: (side: Side, source: string) => void;
}

export type ITileRenderData = {
    requiredHelperAmount: number;
    id: number;
    show: boolean;
    position: TilePosition;
    tileResourceService: ITileResourceServiceRenderData | null;
    canCampBeSettled: boolean;
    camp: boolean;
    modifiers: TileModifiers;
    markedForAction: boolean;

    requiredPawnsSatisfied: {
        left: boolean,
        right: boolean,
    }
};

export interface MarkedForAction {
    action: TILE_ACTION;
    source: string;
    trigger: (this: ITile) => void;
}

export interface ITileBuiltStructures {
    shelter: number;
    roof: number;
    palisade: number;
}

export type TileResource = "food" | "wood" | "beast";

export enum TERRAIN_TYPE {
    BEACH = "beach",
    HILLS = "hills",
    MOUNTAINS = "mountains",
    RIVER = "river",
    PLAINS = "plains",
}

export interface TileExtras {
    discoveryToken: number;
    totem: boolean;
    naturalShelter: boolean;
}

export interface TilePosition {
    borderTiles: number[];
    cords: {
        left: number;
        top: number;
    };
}

export type BuiltTileStructure = "roof" | "palisade" | "shelter";

export enum TILE_ACTION {
    SET_TIME_CONSUMING_ACTION = "set time consuming action",
    UNSET_TIME_CONSUMING_ACTON = "unset time consuming action",
    SET_GREATER_DANGER = "set greater danger",
    UNSET_GREATER_DANGER = "unset greater danger",
    DEPLETE_TERRAIN_TYPE = "unset terrain type",
}


export interface TileModifiers {
    greaterDanger: boolean;
    timeConsumingAction: boolean;
    terrainDepleted: boolean;
}
