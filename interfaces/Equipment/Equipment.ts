import {IGame} from "../Game";
import {EqList} from "../../constants/eqList";
import {IItem, IItemRenderData, ITEM} from "./Item";
import {IPlayerCharacter} from "../Characters/PlayerCharacter";


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

    getItem: (item: ITEM) => IItem;
    renderData: IEquipmentRenderData;
}
