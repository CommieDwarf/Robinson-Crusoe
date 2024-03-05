import {TERRAIN_TYPE, TileResource} from "./ITile";

export interface FixedTileResources {
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
