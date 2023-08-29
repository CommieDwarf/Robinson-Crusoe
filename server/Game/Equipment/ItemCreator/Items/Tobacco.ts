import {Item} from "../Item";
import {IItem, ITEM} from "../../../../../interfaces/Equipment/Item";
import {IGame} from "../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";

export class Tobacco extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.TOBACCO, "Fajka i tytoń", game);
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter = user) {
        super.use(user);
        this._game.characterService.incrDetermination(target, 2, this.namePL);
    }
}
