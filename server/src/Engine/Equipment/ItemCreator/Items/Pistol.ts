import {Item} from "../Item";
import {IItem, ITEM} from "../../../../types/Equipment/Item";
import {IGame} from "../../../../types/Game";
import {CONSTRUCTION} from "../../../../types/ConstructionService/Construction";
import {IPlayer} from "../../../../types/PlayerService/Player";
import {ICharacter} from "../../../../types/Characters/Character";

export class Pistol extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.PISTOL, "Pistolet", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
    }
}
