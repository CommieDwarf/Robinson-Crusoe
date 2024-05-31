import {IGame} from "../Game";
import {IItem, IItemRenderData, ITEM} from "./Item";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";


export interface IEquipmentRenderData {
    items: IItemRenderData[];
}

export interface IEquipment {
    items: IItem[];
    game: IGame;
    useItem: (item: ITEM, character: ICharacter) => void;
    hasUses: (item: ITEM) => boolean;

    hasItem: (item: ITEM) => boolean;
    getUses: (item: ITEM) => number;

    addRandomItem: (logSource: string) => void;

    getItem: (item: ITEM) => IItem;
    renderData: IEquipmentRenderData;
}
