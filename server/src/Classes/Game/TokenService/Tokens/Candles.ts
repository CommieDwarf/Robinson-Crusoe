import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {PAWN_HELPER_ACTION} from "@shared/types/Game/Pawns/Pawn";
import {DISCOVERY_TOKEN, IToken} from "@shared/types/Game/TokenService/Token";
import {ICharacter} from "@shared/types/Game/Characters/Character";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";

export class Candles extends Token implements IToken {
    constructor(game: IGame) {
        super(
            game,
            DISCOVERY_TOKEN.CANDLES,
            "świece",
            "Jednorazowy brązowy pionek dodatkowy do Akcji Budowy"
        );
    }

    use(character: ICharacter, target?: ICharacter) {
        super.use(character, target);
        character.pawnService.addPawn(true, PAWN_HELPER_ACTION.BUILD);
        this._used = true;
    }

    autoDiscard() {
    }
}
