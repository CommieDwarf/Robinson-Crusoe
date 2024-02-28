import {Item} from "../Item";
import {IItem, ITEM} from "../../../../../interfaces/Equipment/Item";
import {IGame} from "../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";
import {CONSTRUCTION} from "../../../../../interfaces/ConstructionService/Construction";
import {IPlayer} from "../../../../../interfaces/PlayerService/Player";
import {ICharacter} from "../../../../../interfaces/Characters/Character";

export class Pistol extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.PISTOL, "Pistolet", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
    }
}
