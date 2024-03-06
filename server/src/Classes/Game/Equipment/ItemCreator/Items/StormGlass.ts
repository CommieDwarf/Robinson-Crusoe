import {Item} from "../Item";
import {IItem, ITEM} from "@shared/types/Game/Equipment/Item";
import {IGame} from "@shared/types/Game/Game";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class StormGlass extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.STORM_GLASS, "Barometr", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        //TODO: implement weather dice before action Phase.
    }
}
