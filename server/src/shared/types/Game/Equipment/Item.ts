import {IGame} from "../Game";
import {IPlayer} from "../PlayerService/Player";
import {ICharacter} from "../Characters/Character";

export interface IItemRenderData {
    name: ITEM;
    uses: number;
}

export enum ITEM {
    BIBLE = "bible",
    BISCUITS = "biscuits",
    EMPTY_BOTTLE = "empty bottle",
    FLASK_OF_RUM = "flask of rum",
    HAMMER = "hammer",
    PISTOL = "pistol",
    STORM_GLASS = "storm glass",
    TOBACCO = "tobacco",
}

export interface IItem {
    name: ITEM;
    uses: number;
    game: IGame;
    hasUses: boolean;
    use: (user: IPlayer, target?: ICharacter) => void;
    renderData: IItemRenderData;
}
