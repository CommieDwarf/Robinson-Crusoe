import { IPlayerCharacter } from "../Characters/Character";
import { ISkillRenderData } from "../Skill/Skill";

export interface IPawnRenderData {
  draggableId: string;
  character: {
    name: string;
    namePL: string;
    gender: string;
    id: number;
    skills: ISkillRenderData[];
    determination: number;
  };
}

export interface IPawn {
  draggableId: string;
  character: IPlayerCharacter;
  renderData: IPawnRenderData;
}

export interface IPawnHelper extends IPawn {
  disposable: boolean;
  action: PAWN_HELPER_ACTION;
  disposed: boolean;
}

export interface IPawnHelperRenderData extends IPawnRenderData {
  disposable: boolean;
  action: PAWN_HELPER_ACTION;
}

export enum PAWN_HELPER_ACTION {
  GATHER = "gather",
  EXPLORE = "explore",
  BUILD = "build",
  HUNT = "hunt",
  GATHER_EXPLORE = "gather explore",
}
