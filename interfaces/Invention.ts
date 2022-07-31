import { TerrainType } from "./Tile";
import { IResources } from "./Resources";

export interface IInvention {
  name: string;
  locked: boolean;
  requiredHelpersAmount: number;
  reward: {};
  type: INVENTION_TYPE;
  committedResources: IResources;
  isBuilt: boolean;
  cost: IResources;
  requirement: {
    invention: IInvention | null;
    terrainType: TerrainType | null;
  };
}

export enum INVENTION_TYPE {
  NORMAL = "normal",
  STARTER = "starter",
  PERSONAL = "personal",
  SCENARIO = "scenario",
}
