import {Item} from "../Item";
import {IItem, ITEM} from "../../../../../../interfaces/Equipment/Item";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {IPlayer} from "../../../../../../interfaces/PlayerService/Player";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";

export class Tobacco extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.TOBACCO, "Fajka i tytoń", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.characterService.incrDetermination(user.getCharacter(), 2, this.namePL);
    }
}
