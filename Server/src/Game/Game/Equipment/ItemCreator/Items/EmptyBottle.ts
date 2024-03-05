import {Item} from "../Item";
import {IPlayer} from "@sharedTypes/PlayerService/Player";
import {IItem, ITEM} from "@sharedTypes/Equipment/Item";
import {CONSTRUCTION} from "@sharedTypes/ConstructionService/Construction";
import {IGame} from "@sharedTypes/Game";
import {ICharacter} from "@sharedTypes/Characters/Character";


export class EmptyBottle extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.EMPTY_BOTTLE, "Pusta butelka", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.constructionService.lvlUpConstruction(
            CONSTRUCTION.WEAPON,
            1,
            this.namePL
        );
    }
}
