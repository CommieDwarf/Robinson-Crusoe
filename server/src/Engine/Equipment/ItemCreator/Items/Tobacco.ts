import {Item} from "../Item";
import {IItem, ITEM} from "../../../../types/Equipment/Item";
import {IGame} from "../../../../types/Game";
import {IPlayer} from "../../../../types/PlayerService/Player";
import {ICharacter} from "../../../../types/Characters/Character";

export class Tobacco extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.TOBACCO, "Fajka i tytoń", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.characterService.incrDetermination(user.getCharacter(), 2, this.namePL);
    }
}
