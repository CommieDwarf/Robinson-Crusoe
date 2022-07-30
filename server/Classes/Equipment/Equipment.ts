import shuffle from "../../../utils/shuffleArray";
import equipmentList from "../../constants/equipmentList";
import { EqList } from "../../constants/equipmentList";
import EquipmentList from "../../constants/equipmentList";
import Entries from "../../../interfaces/Entries";
import IEquipmentItem from "../../../interfaces/EquipmentItem";

class EquipmentItem implements IEquipmentItem {
  get name(): keyof EqList {
    return this._name;
  }

  get namePL(): string {
    return this._namePL;
  }

  get uses(): number {
    return this._uses;
  }

  get game(): {} {
    return this._game;
  }

  private readonly _name: keyof EqList;
  private readonly _namePL: string;
  private _uses = 2;
  private readonly _game: {};

  constructor(name: keyof EqList, namePL: string, game: {}) {
    this._name = name;
    this._namePL = namePL;
    this._game = game;
  }

  private useItemEffect() {
    throw new Error("useItemEffect method not implemented");
  }

  hasUses() {
    return this._uses > 0;
  }

  private decrementUses() {
    if (!this.hasUses()) {
      throw new Error("Item " + this._name + " is used Up!");
    }
    this._uses--;
  }

  useItem() {
    this.useItemEffect();
    this.decrementUses();
  }
}

export default class Equipment {
  equipmentItems = this.getInitialEquipmentItems(equipmentList);
  game: {};

  constructor(game: {}) {
    this.game = game;
  }

  getInitialEquipmentItems(
    itemList: Map<keyof EqList, string>
  ): EquipmentItem[] {
    const items = Object.entries(itemList) as Entries<EqList>;
    const random2Items = shuffle(items).slice(0, 2);
    return random2Items.map(([name, plName]) => {
      return new EquipmentItem(name, plName, this.game);
    });
  }

  useItem(name: keyof EqList) {
    this.findItem(name).useItem();
  }

  hasUses(name: keyof EqList) {
    return this.findItem(name).hasUses();
  }

  getUses(name: keyof EqList) {
    return this.findItem(name).uses;
  }

  private findItem(name: keyof EqList) {
    const item = this.equipmentItems.find((item) => {
      return item.name === name;
    });
    if (!item) {
      throw new Error("You don't have equipment item with such name: " + name);
    }
    return item;
  }
}
