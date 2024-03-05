import {Item} from "../Item";
import {IPlayer} from "@sharedTypes/PlayerService/Player";
import {IItem, ITEM} from "@sharedTypes/Equipment/Item";
import {IGame} from "@sharedTypes/Game";
import {ICharacter} from "@sharedTypes/Characters/Character";


export class Biscuits extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.BISCUITS, "Suchary", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.resourceService.addBasicResourceToOwned("dryFood", 1, this.namePL);
    }
}
