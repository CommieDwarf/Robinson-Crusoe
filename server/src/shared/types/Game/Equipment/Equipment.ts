import {IGame} from "../Game";
import {IItem, IItemRenderData, ITEM} from "./Item";


export interface IEquipmentRenderData {
    items: IItemRenderData[];
}

export interface IEquipment {
    items: IItem[];
    game: IGame;
    useItem: (item: ITEM) => void;
    hasUses: (item: ITEM) => boolean;

    hasItem: (item: ITEM) => boolean;
    getUses: (item: ITEM) => number;

    addRandomItem: (logSource: string) => void;

    getItem: (item: ITEM) => IItem;
    renderData: IEquipmentRenderData;
}
