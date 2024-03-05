import {Item} from "../Item";
import {IItem, ITEM} from "../../../../types/Equipment/Item";
import {IGame} from "../../../../types/Game";
import {IPlayer} from "../../../../types/PlayerService/Player";
import {ICharacter} from "../../../../types/Characters/Character";

export class Biscuits extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.BISCUITS, "Suchary", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.resourceService.addBasicResourceToOwned("dryFood", 1, this.namePL);
    }
}
