import {Token} from "../Token/Token";
import {IGame} from "../../../../../../interfaces/Game";
import {IPlayerCharacter} from "../../../../../../interfaces/Characters/PlayerCharacter";
import {DISCOVERY_TOKEN} from "../../../../../../interfaces/TokenService/Token";
import {ICharacter} from "../../../../../../interfaces/Characters/Character";
import {IPlayer} from "../../../../../../interfaces/PlayerService/Player";

export class Castaways4 extends Token {
    constructor(game: IGame) {
        super(game, DISCOVERY_TOKEN.SCENARIO_4, "medalik z portretem damy", "Daje 3 żetony determinacji.");
    }

    use(user: IPlayer, target?: ICharacter) {

        super.use(user, target);
        this._game.characterService.incrDetermination(user.getCharacter(), 3, this._sourceLog);
        this._used = true;
    }

    autoDiscard() {
    }
}
