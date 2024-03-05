import {IPlayer} from "@sharedTypes/PlayerService/Player";
import {Item} from "../Item";
import {IItem, ITEM} from "@sharedTypes/Equipment/Item";
import {CONSTRUCTION} from "@sharedTypes/ConstructionService/Construction";
import {IGame} from "@sharedTypes/Game";
import {ICharacter} from "@sharedTypes/Characters/Character";


export class Pistol extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.PISTOL, "Pistolet", game);
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
    }
}
