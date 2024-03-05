import {IPlayer} from "@sharedTypes/PlayerService/Player";
import {Item} from "../Item";
import {IItem, ITEM} from "@sharedTypes/Equipment/Item";
import {IGame} from "@sharedTypes/Game";
import {ICharacter} from "@sharedTypes/Characters/Character";


export class StormGlass extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.STORM_GLASS, "Barometr", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        //TODO: implement weather dice before action Phase.
    }
}
