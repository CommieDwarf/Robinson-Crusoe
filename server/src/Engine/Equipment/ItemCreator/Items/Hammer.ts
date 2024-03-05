import {Item} from "../Item";
import {IItem, ITEM} from "../../../../types/Equipment/Item";
import {IGame} from "../../../../types/Game";
import {PAWN_HELPER_ACTION} from "../../../../types/Pawns/Pawn";
import {IPlayer} from "../../../../types/PlayerService/Player";
import {ICharacter} from "../../../../types/Characters/Character";

export class Hammer extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.HAMMER, "Młotek", game);
    }

    use(user: IPlayer, target: ICharacter = user.getCharacter()) {
        super.use(user, target);
        user.getCharacter().pawnService.addPawn(true, PAWN_HELPER_ACTION.BUILD);
    }
}
