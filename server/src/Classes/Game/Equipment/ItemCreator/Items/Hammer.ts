import {Item} from "../Item";
import {IItem, ITEM} from "@shared/types/Game/Equipment/Item";
import {IGame} from "@shared/types/Game/Game";
import {PAWN_HELPER_ACTION} from "@shared/types/Game/Pawns/Pawn";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Hammer extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.HAMMER, game);
    }

    use(user: IPlayer, target: ICharacter = user.getCharacter()) {
        super.use(user, target);
        user.getCharacter().pawnService.addPawn(true, PAWN_HELPER_ACTION.BUILD);
    }
}
