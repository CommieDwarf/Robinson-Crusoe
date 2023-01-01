export type ITileRenderData = {
  requiredHelperAmount: number;
  id: number;
  show: boolean;
  position: TilePosition;
  tileType: TileType | null;
  canCampBeSettled: boolean;
  camp: boolean;
};

export type BuiltTileStructure = "roof" | "palisade" | "shelter";

export interface ITile {
  position: TilePosition;
  id: number;
  camp: boolean;
  show: boolean;
  tileType: TileType | null;
  requiredHelperAmount: number;
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
  canCampBeSettled: boolean;
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

export interface TileType {
  id: number;
  terrainType: TERRAIN_TYPE;
  resources: {
    left: TileResource;
    right: TileResource;
  };
  extras: TileExtras;
}

export interface TilePosition {
  borderTiles: number[];
  cords: {
    left: number;
    top: number;
  };
}
