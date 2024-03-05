import {Item} from "../Item";
import {IItem, ITEM} from "../../../../types/Equipment/Item";
import {IGame} from "../../../../types/Game";
import {IPlayer} from "../../../../types/PlayerService/Player";
import {ICharacter} from "../../../../types/Characters/Character";

export class StormGlass extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.STORM_GLASS, "Barometr", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        //TODO: implement weather dice before action Phase.
    }
}
