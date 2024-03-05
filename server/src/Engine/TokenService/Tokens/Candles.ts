import {Token} from "./Token/Token";
import {IGame} from "../../../types/Game";
import {PAWN_HELPER_ACTION} from "../../../types/Pawns/Pawn";
import {DISCOVERY_TOKEN, IToken} from "../../../types/TokenService/Token";
import {ICharacter} from "../../../types/Characters/Character";
import {IPlayer} from "../../../types/PlayerService/Player";

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
