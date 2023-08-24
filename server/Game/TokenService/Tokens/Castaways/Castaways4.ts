import {Token} from "../Token/Token";
import {IGame} from "../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../interfaces/Characters/PlayerCharacter";
import {DISCOVERY_TOKEN} from "../../../../../interfaces/TokenService/Token";

export class Castaways4 extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.SCENARIO_4, "medalik z portretem damy", "Daje 3 żetony determinacji.");
    }

    use(user: IPlayerCharacter, target: IPlayerCharacter | null) {

        super.use(user);
        this._game.characterService.incrDetermination(user, 3, this._sourceLog);
        this._used = true;
    }

    autoDiscard() {
    }
}
