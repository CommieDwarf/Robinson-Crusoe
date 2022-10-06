export type ITileRenderData = {
  helpersRequired: number;
  id: number;
  show: boolean;
  structure: TileStructure;
  type: TileType | null;
};

export type BuiltTileStructure = "roof" | "palisade" | "shelter";

export interface ITile {
  structure: TileStructure;
  id: number;
  starter: boolean;
  show: boolean;
  type: TileType | null;
  helpersRequired: number;
  reveal: (type: TileType) => void;
  renderData: ITileRenderData;
  builtStructures: ITileBuiltStructures;
  resetStructures: () => void;
  setStructureLvl: (structure: BuiltTileStructure, amount: number) => void;
  incrementStructureLvl: (
    structure: BuiltTileStructure,
    amount: number
  ) => void;
  decrementStructureLvl: (
    structure: BuiltTileStructure,
    amount: number
  ) => void;
}

export interface ITileBuiltStructures {
  shelter: number;
  roof: number;
  palisade: number;
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
  resources: {
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
