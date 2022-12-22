import {
  TerrainType,
  TileExtras,
  TileResource,
} from "../interfaces/TileService/ITile";

export class TileType {
  id: number;
  terrainType: TerrainType;
  resources: {
    left: TileResource;
    right: TileResource;
  };
  extras: TileExtras;

  constructor(
    id: number,
    terrainType: TerrainType,
    resources: { left: TileResource; right: TileResource },
    extras: TileExtras
  ) {
    this.id = id;
    this.terrainType = terrainType;
    this.extras = extras;
    this.resources = resources;
  }
}

export const tileTypes: TileType[] = [
  new TileType(
    1,
    "hills",
    { left: "wood", right: "food" },
    { discoveryToken: 1, totem: true, naturalShelter: false }
  ),
  new TileType(
    2,
    "river",
    { left: "beast", right: "food" },
    { discoveryToken: 3, totem: false, naturalShelter: false }
  ),
  new TileType(
    3,
    "plains",
    { left: "wood", right: "beast" },
    { discoveryToken: 2, totem: false, naturalShelter: false }
  ),
  new TileType(
    4,
    "plains",
    { left: "food", right: "beast" },
    { discoveryToken: 3, totem: false, naturalShelter: false }
  ),
  new TileType(
    5,
    "mountains",
    { left: "wood", right: "beast" },
    { discoveryToken: 1, totem: false, naturalShelter: true }
  ),
  new TileType(
    6,
    "hills",
    { left: "wood", right: "beast" },
    { discoveryToken: 2, totem: true, naturalShelter: false }
  ),
  new TileType(
    7,
    "mountains",
    { left: "food", right: "wood" },
    { discoveryToken: 1, totem: true, naturalShelter: false }
  ),
  new TileType(
    8,
    "mountains",
    { left: "food", right: "beast" },
    { discoveryToken: 1, totem: true, naturalShelter: true }
  ),
  new TileType(
    9,
    "river",
    { left: "wood", right: "food" },
    { discoveryToken: 1, totem: true, naturalShelter: false }
  ),
  new TileType(
    10,
    "plains",
    { left: "food", right: "wood" },
    { discoveryToken: 1, totem: true, naturalShelter: false }
  ),
];

export const starterTile = new TileType(
  0,
  "beach",
  { left: "wood", right: "food" },
  { discoveryToken: 0, totem: false, naturalShelter: false }
);
