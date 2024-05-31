import {Item} from "../Item";
import {IItem, ITEM} from "@shared/types/Game/Equipment/Item";
import {IGame} from "@shared/types/Game/Game";
import {CONSTRUCTION} from "@shared/types/Game/ConstructionService/Construction";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Pistol extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.PISTOL, game);
    }

    use(character: ICharacter, target?: ICharacter) {
        super.use(character);
        this._game.constructionService.getConstruction(CONSTRUCTION.WEAPON).incrTemporaryBoost(3);
    }
}
