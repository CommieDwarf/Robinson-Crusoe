import {IPlayer} from "@sharedTypes/PlayerService/Player";
import {Item} from "../Item";
import {IItem, ITEM} from "@sharedTypes/Equipment/Item";
import {IGame} from "@sharedTypes/Game";
import {ICharacter} from "@sharedTypes/Characters/Character";


export class Tobacco extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.TOBACCO, "Fajka i tytoń", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.characterService.incrDetermination(user.getCharacter(), 2, this.namePL);
    }
}
