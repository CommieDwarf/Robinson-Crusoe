import { EqList } from "../../server/constants/eqList";
import { IGame } from "../Game";

export interface IItem {
  name: keyof EqList;
  namePL: string;
  uses: number;
  game: IGame;
  use: () => void;
}
