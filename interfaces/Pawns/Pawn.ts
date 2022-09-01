import { ICharacter } from "../Characters/Character";
import { HelperAction } from "../Action";

export interface IPawnRenderData {
  draggableId: string;
  characterId: number;
}

export interface IPawn {
  draggableId: string;
  character: ICharacter;
  renderData: IPawnRenderData;
}

export interface IPawnHelper extends IPawn {
  disposable: boolean;
  action: HelperAction;
}
