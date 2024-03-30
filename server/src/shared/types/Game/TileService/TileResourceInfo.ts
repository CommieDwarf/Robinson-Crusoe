import {TERRAIN_TYPE, TileResource} from "./ITile";

export interface TileType {
    id: number;
    terrainType: TERRAIN_TYPE;
    resources: {
        left: TileResource;
        right: TileResource;
    };
    extras: {
        discoveryToken: number;
        totem: boolean;
        naturalShelter: boolean;
    };
}
