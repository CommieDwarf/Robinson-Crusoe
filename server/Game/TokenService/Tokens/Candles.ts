import {Token} from "./Token/Token";
import {IGame} from "../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";
import {PawnHelper} from "../../PawnService/Pawn/PawnHelper";
import {PAWN_HELPER_ACTION} from "../../../../interfaces/Pawns/Pawn";
import {DISCOVERY_TOKEN} from "../../../../interfaces/TokenService/Token";

export class Candles extends Token {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.CANDLES,
            "świece",
            "Jednorazowy brązowy pionek dodatkowy do Akcji Budowy"
        );
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter | null = null) {
        super.use(user);
        const pawnService = user.pawnService;
        const pawn = new PawnHelper(user, true, PAWN_HELPER_ACTION.BUILD);
        pawnService.addPawn(pawn);
        pawnService.copyPawnToFreePawns(pawn.draggableId);
        this._used = true;
    }

    autoDiscard() {
    }
}
