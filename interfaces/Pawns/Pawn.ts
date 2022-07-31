import { ICharacter } from "../Characters/Character";
import { HelperAction } from "../Action";

export interface IPawn {
  draggableId: string;
  character: ICharacter;
}

export interface IPawnHelper extends IPawn {
  disposable: boolean;
  action: HelperAction;
}
