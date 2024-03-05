import {IGame} from "../Game";
import {EqList} from "../../Server/constants/eqList";
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

    addRandomItem: (logSource: string) => void;

    getItem: (item: ITEM) => IItem;
    renderData: IEquipmentRenderData;
}
