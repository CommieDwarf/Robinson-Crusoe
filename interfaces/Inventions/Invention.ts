import { TerrainType } from "../TileService/ITile";
import { IResources, IResourcesAmount } from "../Resources/Resources";

export interface IInventionRenderData {
  name: string;
  locked: boolean;
  requiredHelpersAmount: number;
  type: INVENTION_TYPE;
  committedResources: IResourcesAmount;
  isBuilt: boolean;
}

export interface IInvention {
  name: string;
  namePL: string;
  locked: boolean;
  requiredHelpersAmount: number;
  reward: {};
  type: INVENTION_TYPE;
  committedResources: IResources;
  isBuilt: boolean;
  cost: IResources;
  requirement: {
    invention: string[] | null;
    terrainType: TerrainType | null;
  };
  renderData: IInventionRenderData;
}

export enum INVENTION_TYPE {
  NORMAL = "normal",
  STARTER = "starter",
  PERSONAL = "personal",
  SCENARIO = "scenario",
}
