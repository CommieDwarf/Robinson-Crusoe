import { IPawn } from "./Pawns/Pawn";

export interface TileActionSlots {
  gather: {
    left: {
      leader: null | IPawn;
      helpers: (null | IPawn)[];
    };
    right: {
      leader: null | IPawn;
      helpers: (null | IPawn)[];
    };
  };
  explore: {
    leader: null | IPawn;
    helpers: (null | IPawn)[];
  };
}

export default interface ITile {
  structure: TileStructure;
  id: number;
  starter: boolean;
  show: boolean;
  type: TileType | null;
  helpersRequired: number;
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
