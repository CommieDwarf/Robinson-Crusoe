import shuffle from "../../../utils/shuffleArray";
import {
    IEquipment,
    IEquipmentRenderData,
} from "../../../interfaces/Equipment/Equipment";
import {IItem, ITEM} from "../../../interfaces/Equipment/Item";
import {IGame} from "../../../interfaces/Game";
import {EqList, equipmentList} from "../../../constants/eqList";
import {ItemCreator} from "./ItemCreator/ItemCreator";
import {IPlayerCharacter} from "../../../interfaces/Characters/PlayerCharacter";

export class Equipment implements IEquipment {
    get renderData(): IEquipmentRenderData {
        return {
            items: this.items.map((item) => item.renderData),
        };
    }

    items: IItem[];
    game: IGame;
    private _itemCreator;

    constructor(game: IGame) {
        this.game = game;
        this._itemCreator = new ItemCreator(game);
        this.items = this.getInitialItems(equipmentList);
    }

    getInitialItems(itemList: EqList): IItem[] {
        const items = Object.values(ITEM);
        const random2Items = shuffle(items).slice(0, 2);
        return random2Items.map((item) => this._itemCreator.create(item));
    }

    useItem(item: ITEM, user: IPlayerCharacter, target: IPlayerCharacter = user) {
        this.getItem(item).use(user, target);
    }

    hasUses(item: ITEM) {
        return this.getItem(item).hasUses;
    }

    getUses(item: ITEM) {
        return this.getItem(item).uses;
    }

    public hasItem(item: ITEM) {
        return Boolean(this.items.find((it) => item === it.name))
    }

    public getItem(item: ITEM) {
        const found = this.items.find((it) => {
            return it.name === item;
        });
        if (!found) {
            throw new Error("You don't have equipment item with such name: " + item);
        }
        return found;
    }
}
