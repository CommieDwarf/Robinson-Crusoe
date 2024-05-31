import {Token} from "./Token/Token";
import {IGame} from "@shared/types/Game/Game";
import {DISCOVERY_TOKEN} from "@shared/types/Game/TokenService/Token";
import {IPlayer} from "@shared/types/Game/PlayerService/Player";
import {ICharacter} from "@shared/types/Game/Characters/Character";

export class Tobacco extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.TOBACCO,
            "tytoń",
            "Otrzymujesz +1 do morali.");
    }

    use(character: ICharacter, target?: ICharacter) {
        super.use(character);
        this._game.moraleService.lvlUp(1, this._sourceLog);
        this._used = true;
    }

    autoDiscard() {
    }
}
