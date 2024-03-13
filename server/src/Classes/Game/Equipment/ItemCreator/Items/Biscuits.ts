import {Item} from "../Item";
import {IItem, ITEM} from "@shared/types/Game/Equipment/Item";
import {IGame} from "@shared/types/Game/Game";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Biscuits extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.BISCUITS, game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.resourceService.addBasicResourceToOwned("dryFood", 1, this.name);
    }
}
