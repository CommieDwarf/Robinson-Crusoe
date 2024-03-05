import {TERRAIN_TYPE, TileResource} from "../src/types/TileService/ITile";
import {FixedTileResources} from "../src/types/TileService/TileResourceInfo";

function createFixedTileResources(
    id: number,
    terrainType: TERRAIN_TYPE,
    resources: {
        left: TileResource;
        right: TileResource;
    },
    extras: {
        discoveryToken: number;
        totem: boolean;
        naturalShelter: boolean;
    }
): FixedTileResources {
    return {
        id,
        terrainType,
        resources,
        extras,
    };
}

export const fixedTileResources: FixedTileResources[] = [
    createFixedTileResources(
        1,
        TERRAIN_TYPE.HILLS,
        {left: "wood", right: "food"},
        {discoveryToken: 1, totem: true, naturalShelter: false}
    ),
    createFixedTileResources(
        2,
        TERRAIN_TYPE.RIVER,
        {left: "beast", right: "food"},
        {discoveryToken: 3, totem: false, naturalShelter: false}
    ),
    createFixedTileResources(
        3,
        TERRAIN_TYPE.PLAINS,
        {left: "wood", right: "beast"},
        {discoveryToken: 2, totem: false, naturalShelter: false}
    ),
    createFixedTileResources(
        4,
        TERRAIN_TYPE.PLAINS,
        {left: "food", right: "beast"},
        {discoveryToken: 3, totem: false, naturalShelter: false}
    ),
    createFixedTileResources(
        5,
        TERRAIN_TYPE.MOUNTAINS,
        {left: "wood", right: "beast"},
        {discoveryToken: 1, totem: false, naturalShelter: true}
    ),
    createFixedTileResources(
        6,
        TERRAIN_TYPE.HILLS,
        {left: "wood", right: "beast"},
        {discoveryToken: 2, totem: true, naturalShelter: false}
    ),
    createFixedTileResources(
        7,
        TERRAIN_TYPE.MOUNTAINS,
        {left: "food", right: "wood"},
        {discoveryToken: 1, totem: true, naturalShelter: false}
    ),
    createFixedTileResources(
        8,
        TERRAIN_TYPE.MOUNTAINS,
        {left: "food", right: "beast"},
        {discoveryToken: 1, totem: true, naturalShelter: true}
    ),
    createFixedTileResources(
        9,
        TERRAIN_TYPE.RIVER,
        {left: "wood", right: "food"},
        {discoveryToken: 1, totem: true, naturalShelter: false}
    ),
    createFixedTileResources(
        10,
        TERRAIN_TYPE.PLAINS,
        {left: "food", right: "wood"},
        {discoveryToken: 1, totem: true, naturalShelter: false}
    ),
];

export const starterTile: FixedTileResources = createFixedTileResources(
    0,
    TERRAIN_TYPE.BEACH,
    {left: "wood", right: "food"},
    {discoveryToken: 0, totem: false, naturalShelter: false}
);
