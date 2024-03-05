import {IPlayer} from "@sharedTypes/PlayerService/Player";
import {Item} from "../Item";
import {IItem, ITEM} from "@sharedTypes/Equipment/Item";
import {PAWN_HELPER_ACTION} from "@sharedTypes/Pawns/Pawn";
import {IGame} from "@sharedTypes/Game";
import {ICharacter} from "@sharedTypes/Characters/Character";


export class Hammer extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.HAMMER, "Młotek", game);
    }

    use(user: IPlayer, target: ICharacter = user.getCharacter()) {
        super.use(user, target);
        user.getCharacter().pawnService.addPawn(true, PAWN_HELPER_ACTION.BUILD);
    }
}
