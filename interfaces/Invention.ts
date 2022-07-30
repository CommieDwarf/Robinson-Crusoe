import { TerrainType } from "./Tile";
import { Resources } from "../server/Classes/AllResources/AllResources";

export interface IInvention {
  name: string;
  locked: boolean;
  requiredHelpers: number;
  reward: {};
  type: INVENTION_TYPE;
  committedResources: Resources;
  requirement: {
    invention: Invention | null;
    terrainType: TerrainType | null;
  };
}

export enum INVENTION_TYPE {
  NORMAL = "normal",
  STARTER = "starter",
  PERSONAL = "personal",
  SCENARIO = "scenario",
}
