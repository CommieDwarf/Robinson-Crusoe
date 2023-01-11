import {
  TERRAIN_TYPE,
  TileExtras,
  TileResource,
} from "../interfaces/TileService/ITile";

export class TileType {
  id: number;
  terrainType: TERRAIN_TYPE;
  resources: {
    left: {
      resource: TileResource;
      depleted: boolean;
      markedForDepletion: boolean;
    };
    right: {
      resource: TileResource;
      depleted: boolean;
      markedForDepletion: boolean;
    };
  };
  extras: TileExtras;

  constructor(
    id: number,
    terrainType: TERRAIN_TYPE,
    resources: { left: TileResource; right: TileResource },
    extras: TileExtras
  ) {
    this.id = id;
    this.terrainType = terrainType;
    this.extras = extras;
    this.resources = {
      left: {
        resource: resources.left,
        depleted: false,
        markedForDepletion: false,
      },
      right: {
        resource: resources.right,
        depleted: false,
        markedForDepletion: false,
      },
    };
  }
}

export const tileTypes: TileType[] = [
  new TileType(
    1,
    TERRAIN_TYPE.HILLS,
    { left: "wood", right: "food" },
    { discoveryToken: 1, totem: true, naturalShelter: false }
  ),
  new TileType(
    2,
    TERRAIN_TYPE.RIVER,
    { left: "beast", right: "food" },
    { discoveryToken: 3, totem: false, naturalShelter: false }
  ),
  new TileType(
    3,
    TERRAIN_TYPE.PLAINS,
    { left: "wood", right: "beast" },
    { discoveryToken: 2, totem: false, naturalShelter: false }
  ),
  new TileType(
    4,
    TERRAIN_TYPE.PLAINS,
    { left: "food", right: "beast" },
    { discoveryToken: 3, totem: false, naturalShelter: false }
  ),
  new TileType(
    5,
    TERRAIN_TYPE.MOUNTAINS,
    { left: "wood", right: "beast" },
    { discoveryToken: 1, totem: false, naturalShelter: true }
  ),
  new TileType(
    6,
    TERRAIN_TYPE.HILLS,
    { left: "wood", right: "beast" },
    { discoveryToken: 2, totem: true, naturalShelter: false }
  ),
  new TileType(
    7,
    TERRAIN_TYPE.MOUNTAINS,
    { left: "food", right: "wood" },
    { discoveryToken: 1, totem: true, naturalShelter: false }
  ),
  new TileType(
    8,
    TERRAIN_TYPE.MOUNTAINS,
    { left: "food", right: "beast" },
    { discoveryToken: 1, totem: true, naturalShelter: true }
  ),
  new TileType(
    9,
    TERRAIN_TYPE.RIVER,
    { left: "wood", right: "food" },
    { discoveryToken: 1, totem: true, naturalShelter: false }
  ),
  new TileType(
    10,
    TERRAIN_TYPE.PLAINS,
    { left: "food", right: "wood" },
    { discoveryToken: 1, totem: true, naturalShelter: false }
  ),
];

export const starterTile = new TileType(
  0,
  TERRAIN_TYPE.BEACH,
  { left: "wood", right: "food" },
  { discoveryToken: 0, totem: false, naturalShelter: false }
);
