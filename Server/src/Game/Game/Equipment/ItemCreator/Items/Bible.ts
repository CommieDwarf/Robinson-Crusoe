import {Item} from "../Item";
import {IGame} from "@sharedTypes/Game";
import {IPlayer} from "@sharedTypes/PlayerService/Player";
import {IItem, ITEM} from "@sharedTypes/Equipment/Item";
import {ICharacter} from "@sharedTypes/Characters/Character";

export class Bible extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.BIBLE, "Biblia", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user, target);
    }
}
