import {Item} from "../Item";
import {IItem, ITEM} from "../../../../../interfaces/Equipment/Item";
import {IGame} from "../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";

export class Bible extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.BIBLE, game);
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter) {
        super.use(user, target);
    }
}
