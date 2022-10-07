import { ICharacter } from "../Characters/Character";
import { IAction } from "./Action";

export interface IActionService {
  build: IAction;
  explore: IAction;
  gather: IAction;
  hunt: IAction;
  threat: IAction;

  resolveActions: (character: ICharacter) => void;
}
