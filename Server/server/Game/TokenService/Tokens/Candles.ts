import {Token} from "./Token/Token";
import {IGame} from "../../../../../interfaces/Game";
import {PAWN_HELPER_ACTION} from "../../../../../interfaces/Pawns/Pawn";
import {DISCOVERY_TOKEN, IToken} from "../../../../../interfaces/TokenService/Token";
import {ICharacter} from "../../../../../interfaces/Characters/Character";
import {IPlayer} from "../../../../../interfaces/PlayerService/Player";

export class Candles extends Token implements IToken {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.CANDLES,
            "świece",
            "Jednorazowy brązowy pionek dodatkowy do Akcji Budowy"
        );
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user, target);
        user.getCharacter().pawnService.addPawn(true, PAWN_HELPER_ACTION.BUILD);
        this._used = true;
    }

    autoDiscard() {
    }
}
