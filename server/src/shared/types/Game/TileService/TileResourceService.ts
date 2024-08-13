import {TERRAIN_TYPE, TileExtras, TileGatherableResource, TileResource} from "./ITile";

export type Side = "left" | "right";

export interface TileResourceModifier {
    source: string,
    resource: "food" | "wood";
}

export interface TileResourceInfo {
    resource: TileResource;
    depleted: boolean;
    modifiers: TileResourceModifier[];
    markedForAction: MarkedForAction | null;
    shortcut: boolean;
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
    SET_SHORTCUT = "set shortcut",
    UNSET_SHORTCUT = "unset shortcut"
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


    setShortcut: (side: Side, value: boolean) => void;

    getModifiedBasicResourceAmount: (
        side: "left" | "right"
    ) => GatherableResourceAmount | null;
    getSideByResource: (resource: TileResource) => Side | null;

    deplete: (side: Side, source: string) => void;
    replenish: (side: Side, source: string) => void;
    addResourceBoostBySide: (side: Side, source: string) => void;
    addModifierByResource: (resource: TileGatherableResource, source: string) => void;
    removeBoost: (side: Side, source: string) => void;
    clearModifiers: () => void;

    markResourceForAction: (
        side: Side,
        actionName: TILE_RESOURCE_ACTION,
        source: string
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
