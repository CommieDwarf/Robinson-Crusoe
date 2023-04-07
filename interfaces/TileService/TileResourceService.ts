import {TERRAIN_TYPE, TileExtras, TileResource} from "./ITile";

export type Side = "left" | "right";

export interface TileResourceInfo {
    resource: TileResource;
    depleted: boolean;
    modifiers: string[];
    markedForAction: MarkedForAction | null;

    assignedPawns: number;

}

export interface MarkedForAction {
    source: string;
    actionName: TILE_RESOURCE_ACTION;
    trigger: (
        this: ITileResourceService,
        side: "left" | "right",
        source: string
    ) => void;
}

export enum TILE_RESOURCE_ACTION {
    DEPLETE = "deplete",
    UN_DEPLETE = "unDeplete",
    ADD_MODIFIER = "add modifier",
    REMOVE_MODIFIER = "remove modifier",
}

export interface GatherableResourceAmount {
    resource: "wood" | "food";
    amount: number;
}

export interface ITileResourceService {
    id: number;
    terrainType: TERRAIN_TYPE;
    resources: {
        left: TileResourceInfo;
        right: TileResourceInfo;
    };
    extras: TileExtras;

    renderData: ITileResourceServiceRenderData;

    canBeDepleted: (side: Side) => boolean;
    hasModifier: (side: Side) => boolean;
    hasBasicResource: (resource: "food" | "wood") => boolean;

    canActionBePerformed: (action: TILE_RESOURCE_ACTION, side: Side, source: string) => boolean;
    isSideMarkedForAction: (side: Side) => boolean;
    isMarkedForAction: () => boolean;


    getModifiedBasicResourceAmount: (
        side: "left" | "right"
    ) => GatherableResourceAmount | null;
    getSideByResource: (resource: TileResource) => Side | null;

    deplete: (side: Side, source: string) => void;
    unDeplete: (side: Side, source: string) => void;
    addModifier: (side: Side, source: string) => void;
    removeModifier: (side: Side, source: string) => void;
    clearModifiers: () => void;

    markResourceForAction: (
        source: string,
        actionName: TILE_RESOURCE_ACTION,
        side: Side
    ) => void;

    resetActionMarks: () => void;
    triggerAction: (side: Side, source: string) => void;
}

export interface ITileResourceServiceRenderData {
    id: number;
    terrainType: TERRAIN_TYPE;
    resources: {
        left: TileResourceInfo;
        right: TileResourceInfo;
    };
    extras: TileExtras;
}
