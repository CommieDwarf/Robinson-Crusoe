import {Token} from "./Token/Token";
import {IGame} from "../../../types/Game";
import {DISCOVERY_TOKEN} from "../../../types/TokenService/Token";
import {IPlayer} from "../../../types/PlayerService/Player";
import {ICharacter} from "../../../types/Characters/Character";

export class Tobacco extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.TOBACCO,
            "tytoń",
            "Otrzymujesz +1 do morali.");
    }

    use(user: IPlayer, target?: ICharacter) {
        super.use(user);
        this._game.moraleService.lvlUp(1, this._sourceLog);
        this._used = true;
    }

    autoDiscard() {
    }
}
