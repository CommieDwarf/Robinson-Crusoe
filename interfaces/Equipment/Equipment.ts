import { IGame } from "../Game";
import { EqList } from "../../server/constants/eqList";
import { IItem, IItemRenderData } from "./Item";

type EqName = keyof EqList;

export interface IEquipmentRenderData {
  items: IItemRenderData[];
}

export interface IEquipment {
  items: IItem[];
  game: IGame;
  useItem: (name: EqName) => void;
  hasUses: (name: EqName) => void;
  getUses: (name: EqName) => void;
  renderData: IEquipmentRenderData;
}
