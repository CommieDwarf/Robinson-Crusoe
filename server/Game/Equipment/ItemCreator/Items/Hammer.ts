import {Item} from "../Item";
import {IItem, ITEM} from "../../../../../interfaces/Equipment/Item";
import {IGame} from "../../../../../interfaces/Game";
import {PAWN_HELPER_ACTION} from "../../../../../interfaces/Pawns/Pawn";
import {IPlayer} from "../../../../../interfaces/PlayerService/Player";
import {ICharacter} from "../../../../../interfaces/Characters/Character";

export class Hammer extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.HAMMER, "Młotek", game);
    }

    use(user: IPlayer, target: ICharacter = user.getCharacter()) {
        super.use(user, target);
        user.getCharacter().pawnService.addPawn(true, PAWN_HELPER_ACTION.BUILD);
    }
}
