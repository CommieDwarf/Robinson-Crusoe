import {
    GatherableResourceAmount,
    ITileResourceService,
    ITileResourceServiceRenderData,
    Side,
    TILE_RESOURCE_ACTION,
} from "./TileResourceService";
import {TileType} from "./TileResourceInfo";
import {IAssignablePawnsItem, IAssignablePawnsItemRenderData} from "../AssignablePawnsItem/AssignablePawnsItem";

export interface ITile extends IAssignablePawnsItem {
    position: TilePosition;
    id: number;
    distance: number | null;
    camp: boolean;
    show: boolean;

    hasShortcut: boolean;
    tileResourceService: ITileResourceService | null;
    modifiers: TileModifiers;
    markedForAction: MarkedForAction | null;
    builtStructures: ITileBuiltStructures;

    renderData: ITileRenderData;

    isMarkedForAction: () => boolean;

    isExplored: () => boolean;
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
    reveal: (resources: TileType) => void;
    resetStructures: () => void;
    setStructureLvl: (structure: BuiltTileStructure, amount: number) => void;
    setShortcut: (side: Side, value: boolean) => void;

    incrementStructureLvl: (
        structure: BuiltTileStructure,
        amount: number
    ) => void;
    decrementStructureLvl: (
        structure: BuiltTileStructure,
        amount: number
    ) => void;

    resetResourceAssignedPawns: () => void;

    markTileForActon: (actionName: TILE_ACTION, source: string) => void;

    depleteResource: (side: "left" | "right", source: string) => void;
    unDepleteResource: (side: "left" | "right", source: string) => void;
    addModifierBySide: (side: Side, source: string) => void;
    addModifierByResource: (resource: TileGatherableResource, source: string) => void;
    removeResourceModifier: (side: Side | null, resource: "wood" | "food", source: string) => void;
    setTileModifier: (
        modifier: keyof TileModifiers,
        source: string
    ) => void;

    unsetTileModifier: (modifier: keyof TileModifiers,
                        source: string) => void;
    clearResourceModifiers: () => void;


    canResourceActionBePerformed: (action: TILE_RESOURCE_ACTION, arg: Side | TileResource, source: string) => boolean


    canActionBePerformed: (action: TILE_ACTION) => boolean
    markResourceForAction: (
        arg: Side | TileResource,
        actionName: TILE_RESOURCE_ACTION,
        source: string
    ) => void;

    resetTileActionMark: () => void;

    resetTileResourceActionMarks: () => void;

    triggerResourceAction: (side: Side, source: string) => void;

    unsetShortcut: () => void
}

export interface ITileRenderData extends IAssignablePawnsItemRenderData {
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

    requiredPawnAmount: number | null;
}

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
export type TileGatherableResource = "food" | "wood";

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

    FLIP = "flip",
    UN_FLIP = "un flip",
}

export interface TileModifier {
    source: string,
    setInRound: number,
}

export interface TileModifiers {
    greaterDanger: TileModifier | null;
    timeConsumingAction: TileModifier | null;
    terrainDepleted: TileModifier | null;
    flipped: TileModifier | null;
}
