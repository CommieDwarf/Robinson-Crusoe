import shuffle from "../../../utils/shuffleArray";
import Entries from "../../../interfaces/Entries";
import { IEquipment } from "../../../interfaces/Equipment/Equipment";
import { IItem } from "../../../interfaces/Equipment/Item";
import { IGame } from "../../../interfaces/Game";
import { Item } from "./Item";
import { EqList, equipmentList } from "../../constants/eqList";

export class Equipment implements IEquipment {
  items: IItem[];
  game: IGame;

  constructor(game: IGame) {
    this.game = game;
    this.items = this.getInitialItems(equipmentList);
  }

  getInitialItems(itemList: EqList): IItem[] {
    const items = Object.entries(itemList) as Entries<EqList>;
    const random2Items = shuffle(items).slice(0, 2);
    return random2Items.map(([name, plName]) => {
      return new Item(name, plName, this.game);
    });
  }

  useItem(name: keyof EqList) {
    this.getItem(name).use();
  }

  hasUses(name: keyof EqList) {
    return this.getItem(name).use();
  }

  getUses(name: keyof EqList) {
    return this.getItem(name).uses;
  }

  private getItem(name: keyof EqList) {
    const item = this.items.find((item) => {
      return item.name === name;
    });
    if (!item) {
      throw new Error("You don't have equipment item with such name: " + name);
    }
    return item;
  }
}
