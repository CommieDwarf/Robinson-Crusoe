import {Token} from "./Token/Token";
import {IGame} from "../../../../interfaces/Game";
import {DISCOVERY_TOKEN} from "../../../../interfaces/TokenService/Token";
import {IPlayerCharacter} from "../../../../interfaces/Characters/PlayerCharacter";

export class Tobacco extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.TOBACCO,
            "tytoń",
            "Otrzymujesz +1 do morali.");
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter | null = null) {
        super.use(user);
        this._game.moraleService.lvlUp(1, this._sourceLog);
        this._used = true;
    }

    autoDiscard() {
    }
}
