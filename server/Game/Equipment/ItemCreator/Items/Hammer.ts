import {Item} from "../Item";
import {IItem, ITEM} from "../../../../../interfaces/Equipment/Item";
import {IGame} from "../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";
import {PawnHelper} from "../../../PawnService/Pawn/PawnHelper";
import {PAWN_HELPER_ACTION} from "../../../../../interfaces/Pawns/Pawn";

export class Hammer extends Item implements IItem {
    constructor(game: IGame) {
        super(ITEM.HAMMER, "Młotek", game);
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter = user) {
        super.use(user);
        const pawn = new PawnHelper(user, true, PAWN_HELPER_ACTION.BUILD);
        user.pawnService.addPawn(
            pawn
        );
        user.pawnService.copyPawnToFreePawns(pawn.draggableId);
    }
}
