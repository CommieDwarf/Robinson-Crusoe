import { IGame } from "../Game";
import { EqList } from "../../server/constants/eqList";
import { IItem } from "./Item";

type EqName = keyof EqList;

export interface IEquipment {
  items: IItem[];
  game: IGame;
  useItem: (name: EqName) => void;
  hasUses: (name: EqName) => void;
  getUses: (name: EqName) => void;
}
