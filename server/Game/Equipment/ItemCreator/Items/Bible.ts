import {Item} from "../Item";
import {IItem, ITEM} from "../../../../../interfaces/Equipment/Item";
import {IGame} from "../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";
import {IPlayer} from "../../../../../interfaces/PlayerService/Player";
import {ICharacter} from "../../../../../interfaces/Characters/Character";

export class Bible extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.BIBLE, "Biblia", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user, target);
    }
}
