export default interface ITile {
  id: number;
  structure: TileStructure;
  starter: boolean;
  show: boolean;
  type: TileType | null;
}

export type TileResource = "food" | "wood" | "beast";

export type TerrainType = "beach" | "hills" | "mountains" | "river" | "plains";

export interface TileExtras {
  discoveryToken: number;
  totem: boolean;
  naturalShelter: boolean;
}

export interface TileType {
  id: number;
  terrainType: TerrainType;
  slots: {
    left: TileResource;
    right: TileResource;
  };
  extras: TileExtras;
}

export interface TileStructure {
  borderTiles: number[];
  position: {
    left: number;
    top: number;
  };
}
