import { IGame } from "../Game";
import { EqList } from "../../constants/eqList";
import { IItem, IItemRenderData, ITEM } from "./Item";
import { IPlayerCharacter } from "../Characters/PlayerCharacter";
import { IPlayerCharacter } from "../Characters/Character";

type EqName = keyof EqList;

export interface IEquipmentRenderData {
  items: IItemRenderData[];
}

export interface IEquipment {
  items: IItem[];
  game: IGame;
  useItem: (item: ITEM, user: IPlayerCharacter, target: IPlayerCharacter) => void;
  hasUses: (item: ITEM) => boolean;
  getUses: (item: ITEM) => number;
  renderData: IEquipmentRenderData;
}
