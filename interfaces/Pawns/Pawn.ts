import { ICharacter, ICharacterRenderData } from "../Characters/Character";
import { HelperAction } from "../Action";

export interface IPawnRenderData {
  draggableId: string;
  character: {
    name: string;
    namePL: string;
    gender: string;
    id: number;
  };
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
